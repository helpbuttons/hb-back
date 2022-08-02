import { ApiProperty } from '@nestjs/swagger';
import { TemplateButton } from './template-button.entity';
import { IsEnum, IsJSON, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

// https://github.com/typestack/class-validator

export class CreateTemplateButtonDto implements Partial<TemplateButton> {
  
  @ApiProperty({
    type: String,
    required: true,
  })
  @MinLength(3, {
    message: 'templateButton name is too short',
  })
  name: string;
  
  @ApiProperty({
    type: String,
    required: true,
  })
  @MinLength(3, {
    message: 'templateButton description is too short',
  })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsJSON({})
  formFields: string;

}


export class UpdateTemplateButtonDto extends PartialType(CreateTemplateButtonDto) {}