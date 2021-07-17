import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Question } from "@models/Question";

@Entity()
@ObjectType()
export class Answer extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => String)
    @Column()
    body: string;

    @Field(() => Boolean)
    @Column({ default: false })
    isCorrect: boolean;

    @Field(() => Question)
    @ManyToOne(() => Question, (question) => question.answers)
    question: Question;
}
