import { Box, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";
import { Question } from "../generated/types";

interface QuestionCardProps {
    question: Question;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
    return (
        <Box borderRadius={12} bg="#ffffff05" p={4}>
            <Heading fontSize={24} mb={6}>{question.body}</Heading>
            <RadioGroup>
                <Stack>
                    {question.answers.map((answer) => (
                        <Radio key={answer.id} value={answer.id}>
                            {answer.body}
                        </Radio>
                    ))}
                </Stack>
            </RadioGroup>
        </Box>
    );
};
