import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { FeedButton } from "./feed-button.entity";
import { FeedButtonService } from "./feed-button.service";


@Crud({
  model: {
    type: FeedButton,
  },
})

@ApiTags('feed-button')
@Controller("feed-button")
export class FeedButtonController {
  constructor(public service: FeedButtonService) {}
}
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Query,
//   UseGuards,
//   Request,
//   UseInterceptors,
//   UploadedFile,
//   UploadedFiles,
// } from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

// import { ApiTags } from '@nestjs/swagger';

// import { CreateFeedButtonDto } from './feed-button.dto';
// import { FeedButtonService } from './feed-button.service';
// // import { FilterButtonsOrmDto } from '../dto/requests/filter-buttons-orm.dto';
// import {
//   editFileName,
//   imageFileFilter,
// } from '../storage/storage.utils';
// import { CurrentUser } from '@src/shared/decorator/current-user';
// import { User } from '../user/user.entity';
// import { Auth } from '@src/shared/decorator/auth.decorator';

// @ApiTags('buttons')
// @Controller('feed')
// export class FeedButtonController {
//   constructor(
//     private readonly feedbuttonService: FeedButtonService,
//   ) {}

//   @Auth()
//   @Post('new')
//   @UseInterceptors(
//     FilesInterceptor('images[]', 4, {
//       storage: diskStorage({
//         destination: process.env.UPLOADS_PATH,
//         filename: editFileName,
//       }),
//       fileFilter: imageFileFilter,
//     }),
//   )
//   create(
//     @Query('buttonId') buttonId: string,
//     @UploadedFiles() images,
//     @Body() createDto: CreateFeedButtonDto,
//     @CurrentUser() user: User,
//   ) {
//     return this.feedbuttonService.create(
//       createDto,
//       user,
//       buttonId,
//       images,
//     );
//   }

//   @Auth()
//   // only author can run this!
//   @Delete('delete/:feedButtonId')
//   async remove(@Param('feedButtonId') feedButtonId: string) {
//     return this.feedbuttonService.remove(feedButtonId);
//   }
// }
