import { MigrationInterface, QueryRunner } from 'typeorm';

export class initalCreate1666979416206 implements MigrationInterface {
    name = 'initalCreate1666979416206';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(150) NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "is_late" boolean NOT NULL DEFAULT false, "is_finished" boolean NOT NULL DEFAULT false, "finished_in" TIMESTAMP, "deadline" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "accountId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "tasks" ADD CONSTRAINT "FK_d0a1ad33ba08146aa395e629113" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(`INSERT INTO accounts (email, password, is_admin) VALUES ('superadm@email.com', 'super', true)
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tasks" DROP CONSTRAINT "FK_d0a1ad33ba08146aa395e629113"`
        );
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }
}
