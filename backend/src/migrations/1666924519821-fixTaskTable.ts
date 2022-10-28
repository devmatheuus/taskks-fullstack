import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTaskTable1666924519821 implements MigrationInterface {
    name = 'fixTaskTable1666924519821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "updated_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "updated_at" SET DEFAULT '2022-10-27 23:48:48.973'`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "created_at" SET DEFAULT '2022-10-27 23:48:48.973'`);
    }

}
