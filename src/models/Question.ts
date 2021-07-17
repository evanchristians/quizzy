import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Answer } from "@models/Answer";

@Entity()
@ObjectType()
export class Question extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => String)
    @Column()
    body: string;

    @Field(() => [Answer])
    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
}
