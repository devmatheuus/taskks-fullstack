import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Account } from './account.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    description: string;

    @Column({ default: false })
    is_late: boolean;

    @Column({ default: false })
    is_finished: boolean;

    @Column()
    finished_in?: Date;

    @Column()
    deadline: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToOne(() => Account, account => account.tasks)
    account: Account;
}
