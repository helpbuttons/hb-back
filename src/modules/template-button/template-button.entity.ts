import { BaseEntity } from '@src/shared/types/base.entity';
import {  Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn  } from 'typeorm';
import { Button } from '../button/button.entity';
import { Network } from '../network/network.entity';
// https://stackoverflow.com/a/67557083

@Entity()
export class TemplateButton extends BaseEntity{
  @Column({})
  @PrimaryColumn({})
  slug: string;

  @Column({})
  description: string;

  @Column('text', { array: true, nullable: true, default: [] })
  formFields: string[];

  @OneToMany(() => Button, (button) => button.template)
  buttons: Button[];

  @ManyToOne(() => Network, (network) => network.templateButtons)
  network: Network;
}