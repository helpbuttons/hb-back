import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dbIdGenerator } from '@src/shared/helpers/nanoid-generator.helper';
import { Repository, In } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { CreateButtonDto, UpdateButtonDto } from './button.dto';
import { Button } from './button.entity';
import { getManager } from 'typeorm';
import { NetworkService } from '../network/network.service';
import { StorageService } from '../storage/storage.service';
import { User } from '../user/user.entity';
import { TemplateButtonService } from '../template-button/template-button.service';

@Injectable()
export class ButtonService {
  constructor(
    @InjectRepository(Button)
    private readonly buttonRepository: Repository<Button>,
    private readonly tagService: TagService,
    private readonly networkService: NetworkService,
    private readonly storageService: StorageService,
    private readonly templateButtonService: TemplateButtonService
  ) {}

  async create(
    createDto: CreateButtonDto,
    networkId: string,
    images: File[],
    user: User,
  ) {
    const network = await this.networkService.findOne(networkId);

    if (!network) {
      throw new HttpException(
        { message: 'network-not-found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const type = await this.templateButtonService.findOne(createDto.type);

    if (!type) {
      throw new HttpException(
        { message: 'type-not-found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const button = {
      id: dbIdGenerator(),
      template: type,
      description: createDto.description,
      latitude: createDto.latitude,
      longitude: createDto.longitude,
      tags: createDto.tags,
      location: () =>
        `ST_MakePoint(${createDto.latitude}, ${createDto.longitude})`,
      network: network,
      images: [],
      owner: user,
    };

    await getManager().transaction(
      async (transactionalEntityManager) => {
        if (Array.isArray(button.tags)) {
          await this.tagService
            .addTags('button', button.id, button.tags)
            .catch((err) => {
              console.log(
                `Error adding tags ${JSON.stringify(
                  button.tags,
                )} to button ${button.id}`,
              );
              throw new HttpException(
                { message: err.message },
                HttpStatus.BAD_REQUEST,
              );
            });
        }

        if (Array.isArray(images) && images.length > 0) {
          button.images = await Promise.all(
            images.map(async (imageFile) => {
              return await await this.storageService.newImage(
                imageFile,
              );
            }),
          );
        }

        await this.buttonRepository.insert([button]);
      },
    );

    return button;
  }

  findOne(id: string) {
    return this.buttonRepository.findOne({
      where: { id },
      relations: ['network', 'feed'],
    });
  }

  update(id: string, updateDto: UpdateButtonDto) {
    let location = {};

    if (updateDto.latitude > 0 && updateDto.longitude > 0) {
      location = {
        location: () =>
          `ST_MakePoint(${updateDto.latitude}, ${updateDto.longitude})`,
      };
    } else {
      delete updateDto.latitude;
      delete updateDto.longitude;
    }

    const button = {
      ...updateDto,
      ...location,
      id,
    };

    if (button.tags) {
      this.tagService.updateTags('button', button.id, button.tags);
    }

    return this.buttonRepository.save([button]);
  }

  async findAll(networkId: string, bounds: any) {
    try {
      const buttonsOnBounds = await this.buttonRepository
        .createQueryBuilder('button')
        .select('id')
        .where(
          `
      button.networkId = '${networkId}' AND
      ST_Contains(ST_GEOMFROMTEXT('POLYGON((
      ${bounds.southWest.lat}
      ${bounds.northEast.lng},
    
      ${bounds.northEast.lat}
      ${bounds.northEast.lng},
    
      ${bounds.northEast.lat}
      ${bounds.southWest.lng},
    
      ${bounds.southWest.lat}
      ${bounds.southWest.lng},
    
      ${bounds.southWest.lat}
      ${bounds.northEast.lng}
    
    ))'), button.location)`,
        )
        .execute();

      const buttonsIds = buttonsOnBounds.map((button) => button.id);

      let buttons = await this.buttonRepository.find({
        relations: ['network', 'feed', 'template'],
        where: {
          id: In(buttonsIds),
        },
        order: {
          created_at: 'DESC',
        },
      });

      return buttons.map((button) => {
        if (button.template != null)
          return {...button, type: button.template.slug}
      })
    } catch (err) {
      throw new NotFoundException('no buttons found');
    }
  }

  remove(id: string) {
    return this.buttonRepository.delete({ id });
  }
}
