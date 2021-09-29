import { inject } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  RestBindings,
  Response
} from '@loopback/rest';
import {TemplateButton} from '../../models';
import {TemplateButtonRepository} from '../../repositories';

export class AdmintemplatebuttonsController {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private httpResponse: Response,
    @repository(TemplateButtonRepository)
    public templateButtonRepository : TemplateButtonRepository,
  ) {}

  @post('/admin/templateButtons')
  @response(200, {
    description: 'TemplateButton model instance',
    content: {'application/json': {schema: getModelSchemaRef(TemplateButton)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TemplateButton, {
            title: 'NewTemplateButton',
            exclude: ['id'],
          }),
        },
      },
    })
    templateButton: Omit<TemplateButton, 'id'>,
  ): Promise<TemplateButton> {
    return this.templateButtonRepository.create(templateButton);
  }

  @get('/admin/templateButtons/count')
  @response(200, {
    description: 'TemplateButton model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TemplateButton) where?: Where<TemplateButton>,
  ): Promise<Count> {
    return this.templateButtonRepository.count(where);
  }

  @get('/admin/templateButtons')
  @response(200, {
    description: 'Array of TemplateButton model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TemplateButton, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TemplateButton) filter?: Filter<TemplateButton>,
  ): Promise<TemplateButton[]> {
    return this.templateButtonRepository.find(filter).then((buttons) => {
      this.httpResponse.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');this.httpResponse.setHeader('x-total-count', buttons.length);
    return buttons;
  });
  }

  @patch('/admin/templateButtons')
  @response(200, {
    description: 'TemplateButton PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TemplateButton, {partial: true}),
        },
      },
    })
    templateButton: TemplateButton,
    @param.where(TemplateButton) where?: Where<TemplateButton>,
  ): Promise<Count> {
    return this.templateButtonRepository.updateAll(templateButton, where);
  }

  @get('/admin/templateButtons/{id}')
  @response(200, {
    description: 'TemplateButton model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TemplateButton, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TemplateButton, {exclude: 'where'}) filter?: FilterExcludingWhere<TemplateButton>
  ): Promise<TemplateButton> {
    return this.templateButtonRepository.findById(id, filter);
  }

  @patch('/admin/templateButtons/{id}')
  @response(204, {
    description: 'TemplateButton PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TemplateButton, {partial: true}),
        },
      },
    })
    templateButton: TemplateButton,
  ): Promise<void> {
    await this.templateButtonRepository.updateById(id, templateButton);
  }

  @put('/admin/templateButtons/{id}')
  @response(204, {
    description: 'TemplateButton PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() templateButton: TemplateButton,
  ): Promise<void> {
    await this.templateButtonRepository.replaceById(id, templateButton);
  }

  @del('/admin/templateButtons/{id}')
  @response(204, {
    description: 'TemplateButton DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.templateButtonRepository.deleteById(id);
  }
}
