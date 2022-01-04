import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCards1640530323493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cards",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "lane_id",
                        type: "uuid"
                    },
                    {
                        name: "dtevento",
                        type: "varchar"
                    },
                    {
                        name: "status",
                        type: "varchar",
                        default: "0"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_card_lane",
                        columnNames: ["lane_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "lanes"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cards");
    }

}