import { ApiProperty } from '@nestjs/swagger';
import { Button } from './button.entity';
import {
  MinLength,
  IsLatitude,
  IsLongitude,
  IsArray,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

// https://github.com/typestack/class-validator

export class CreateButtonDto implements Partial<Button> {
  @ApiProperty({
    name: 'type',
    type: String,
    required: true,
  })
  type: string;

  @ApiProperty({
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({})
  tags: string[];

  @ApiProperty({
    type: String,
    required: true,
  })
  @MinLength(3, {
    message: 'button description is too short',
  })
  description: string;

  @ApiProperty({
    name: 'latitude',
    title: 'Latitude',
    description: 'Latitude of the button',
    type: Number,
    isArray: false,
    required: true,
    example: 39.23864,
  })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    name: 'longitude',
    title: 'Longitude',
    description: 'Longitude of the button',
    type: Number,
    isArray: false,
    required: true,
    example: -8.67096,
  })
  @IsLongitude()
  longitude: number;
}

export class UpdateButtonDto extends PartialType(CreateButtonDto) {}
