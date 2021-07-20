import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => String)
    @Column({ unique: true })
    username: string;

    @Field(() => String)
    @Column({ unique: true })
    email: string;

    @Field(() => String)
    @Column()
    password: string;

    @Field(() => Date)
    @Column({ type: "timestamp", nullable: true })
    last_seen: Date;
}
