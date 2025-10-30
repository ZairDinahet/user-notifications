import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "src/common/enums/channels.enum";

@Entity()
export class Notification {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: Channels,
    default: Channels.EMAIL,
  })
  channel: Channels;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date | null;

  @ManyToOne(
    () => User, 
    (user) => user.notifications, 
    {onDelete: 'CASCADE'}
  )
  user: User;
}
