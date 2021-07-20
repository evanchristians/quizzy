import { ChevronRightIcon } from "@chakra-ui/icons";
import { Heading, List, ListItem, Stack } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { QuestionCard } from "../components/QuestionCard";
import {
    Question,
    useGetOnlineUsersSubscription,
    useMeQuery,
    useQuestionsQuery,
} from "../generated/types";

const Index = () => {
    const { data } = useQuestionsQuery();
    const { data: user } = useMeQuery();
    const { data: onlineUsers } = useGetOnlineUsersSubscription();

    return (
        <Container>
            <Hero />
            {user?.me && <Heading mb={20}>Welcome, {user.me.username}</Heading>}

            <Main pt={24}>
                <Stack spacing={10} mb={12}>
                    {data
                        ? data.questions.map((question, key) => (
                              <QuestionCard
                                  key={key}
                                  question={question as Question}
                              />
                          ))
                        : null}
                </Stack>
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
