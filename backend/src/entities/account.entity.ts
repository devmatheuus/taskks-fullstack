import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Task } from './task.entity';

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column({ length: 150 })
    password: string;

    @Column({ default: false })
    is_admin: boolean;

    @OneToMany(() => Task, task => task.account)
    tasks: Task[];
}
