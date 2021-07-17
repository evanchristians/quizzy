import { CreateQuestionInput } from "@inputs/CreateQuestionInput";
import { UpdateQuestionInput } from "@inputs/UpdateQuestionInput";
import { Answer } from "@models/Answer";
import { Question } from "@models/Question";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class QuestionResolver {
    @Query(() => [Question])
    questions() {
        return Question.find({ relations: ["answers"] });
    }

    @Mutation(() => Question)
    async createQuestion(@Arg("data") data: CreateQuestionInput) {
        const question = Question.create(data);
        question.answers = [];

        for await (const answerData of data.answers) {
            const answer = Answer.create(answerData);
            await answer.save();
            question.answers.push(answer);
        }

        await question.save();
        return question;
    }

    @Query(() => Question)
    question(@Arg("id") id: string) {
        return Question.findOne({ where: { id } });
    }

    @Mutation(() => Question)
    async updateQuestion(
        @Arg("id") id: string,
        @Arg("data") data: UpdateQuestionInput
    ) {
        const question = await Question.findOne({ where: { id } });
        if (!question) throw new Error("Question not found!");
        Object.assign(question, data);
        await question.save();
        return question;
    }

    @Mutation(() => Boolean)
    async deleteQuestion(@Arg("id") id: string) {
        const question = await Question.findOne({ where: { id } });
        if (!question) throw new Error("Question not found!");
        await question.remove();
        return true;
    }
}
