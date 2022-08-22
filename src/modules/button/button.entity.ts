import { BaseEntity } from '@src/shared/types/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { FeedButton } from '../feed-button/feed-button.entity';
import { Network } from '../network/network.entity';
import { TemplateButton } from '../template-button/template-button.entity';
import { User } from '../user/user.entity';
// https://stackoverflow.com/a/67557083

@Entity()
export class Button extends BaseEntity {
  @Column({})
  @PrimaryColumn()
  public id: string;

  @Column({})
  description: string;

  @Column({ type: 'double precision' })
  public latitude: number;

  @Column({ type: 'double precision' })
  public longitude: number;

  @Column({ type: 'geometry' })
  location: object;

  @Column('text', { array: true, nullable: true, default: [] })
  tags: string[];

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToOne(() => TemplateButton, (templateButton) => templateButton.buttons)
  @JoinColumn({ name: "type" })
  template: TemplateButton;

  @ManyToOne(() => Network, (network) => network.buttons)
  network: Network;

  @OneToMany(() => FeedButton, (feed) => feed.button)
  feed: FeedButton[];

  @ManyToOne((type) => User)
  owner: User;
  // missing, network relations, template, owner, tags
}
