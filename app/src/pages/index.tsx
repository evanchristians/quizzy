import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Flex, List, ListIcon, ListItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Container } from "../components/Container";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { useQuestionsQuery } from "../generated/types";

const Index = () => {
    const { data, loading } = useQuestionsQuery();

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log(loading);
    }, [loading]);

    return (
        <Container height="100vh">
            <Hero />
            <Main>
                <List spacing={3} my={0}>
                    {!loading &&
                        data.questions.map((question, key) => (
                            <ListItem key={key}>
                                <ListIcon
                                    as={CheckCircleIcon}
                                    color="green.500"
                                />
                                {question.body}
                                <Flex ml={8}>
                                    {question.answers.map((answer, key) => (
                                        <Box mr={4}>{answer.body}</Box>
                                    ))}
                                </Flex>
                            </ListItem>
                        ))}
                </List>
            </Main>
        </Container>
    );
};

export default Index;
