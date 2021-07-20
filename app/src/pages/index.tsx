import { CheckCircleIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, List, ListIcon, ListItem } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import {
    useGetOnlineUsersSubscription,
    useMeQuery,
    useQuestionsQuery,
} from "../generated/types";

const Index = () => {
    const { data, loading } = useQuestionsQuery();
    const { data: user } = useMeQuery();
    const { data: onlineUsers } = useGetOnlineUsersSubscription();

    return (
        <Container>
            <Hero />
            {user?.me && <Heading mb={20}>Welcome, {user.me.username}</Heading>}

            <Main>
                <List spacing={3} my={0}>
                    {data
                        ? data.questions.map((question, key) => (
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
                          ))
                        : null}
                </List>
                <Heading>Online Users</Heading>
                <List>
                    {onlineUsers
                        ? onlineUsers.getOnlineUsers.map((onlineUser) => (
                              <ListItem key={onlineUser.id}>
                                  <ChevronRightIcon /> {onlineUser.username}
                              </ListItem>
                          ))
                        : null}
                </List>
            </Main>
        </Container>
    );
};

export default Index;
