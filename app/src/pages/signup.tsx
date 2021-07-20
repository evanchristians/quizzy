import { Box, Button, Grid, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { MeDocument, MeQuery, useCreateUserMutation } from "../generated/types";
import { setFieldErrors } from "../utils/setFieldErrors";
import { SignupSchema } from "../utils/validationSchema";
import NextLink from "next/link";

const SignUp = () => {
    const router = useRouter();
    const [createUser] = useCreateUserMutation({});

    const handleSubmit = async ({ username, email, password }) => {
        try {
            await createUser({
                variables: {
                    createUserData: {
                        username,
                        email,
                        password,
                    },
                },
                update: (cache, response) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: "Query",
                            me: response.data.createUser,
                        },
                    });
                },
            });
        } catch (err) {
            console.log(err);
            return { errors: err.graphQLErrors };
        }
    };
    return (
        <Container>
            <Hero title="Sign Up" />
            <Main>
                <Box alignSelf="center" w="min(30rem, 100%)">
                    <Formik
                        initialValues={{
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (
                            values,
                            { setSubmitting, setFieldError }
                        ) => {
                            const { errors } = await handleSubmit(values);
                            console.log(errors);
                            if (errors) {
                                setFieldErrors(setFieldError, errors);
                                setSubmitting(false);
                            } else {
                                router.push("/");
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Stack spacing="2rem">
                                    <Grid
                                        gridColumnGap="2rem"
                                        gridTemplateColumns="repeat(2, 1fr)"
                                    >
                                        <FormInput name="username" />
                                        <FormInput name="email" type="email" />
                                        <FormInput
                                            gridColumn="span 2"
                                            name="password"
                                            type="password"
                                        />
                                        <FormInput
                                            gridColumn="span 2"
                                            name="confirmPassword"
                                            type="password"
                                        />
                                        <Text fontSize={14}>
                                            Already have an account?{" "}
                                            <NextLink href="/login">
                                                <Link>Login</Link>
                                            </NextLink>
                                        </Text>
                                    </Grid>
                                    <Button
                                        alignSelf="center"
                                        type="submit"
                                        size="lg"
                                        loading={isSubmitting.toString()}
                                    >
                                        Sign Up
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Main>
        </Container>
    );
};

export default SignUp;
