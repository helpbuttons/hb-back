import { BaseEntity } from '@src/shared/types/base.entity';
import {  Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn  } from 'typeorm';
import { Button } from '../button/button.entity';
// https://stackoverflow.com/a/67557083

@Entity()
export class TemplateButton extends BaseEntity{
  @Column({})
  @PrimaryColumn({})
  slug: string;

  @Column({})
  description: string;

  @Column({})
  formFields: string;

  @OneToMany(() => Button, (button) => button.template)
  buttons: Button[];
  //TODO: missing: owner, 
}