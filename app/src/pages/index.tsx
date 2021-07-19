import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Container } from "../components/Container";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { useMeQuery, useQuestionsQuery } from "../generated/types";

const Index = () => {
    const { data, loading } = useQuestionsQuery();
    const { data: user } = useMeQuery();

    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <Container>
            <Hero />
            {user?.me && <Text>Welcome, {user.me.username}</Text>}

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
                                        <Box mr={4} key={key}>
                                            {answer.body}
                                        </Box>
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
