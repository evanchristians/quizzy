import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { useCreateUserMutation } from "../generated/types";
import { SignupSchema } from "../utils/validationSchema";

const SignUp = () => {
    const [createUser] = useCreateUserMutation({});

    const handleSubmit = async ({ username, email, password }) => {
        const { data } = await createUser({
            variables: {
                createUserData: {
                    username,
                    email,
                    password,
                },
            },
        });

        return { data };
    };
    return (
        <Container>
            <Hero title="Sign Up" />
            <Main>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values)
                        const { data } = await handleSubmit(values);
                        if (data) setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Stack spacing="2rem">
                                <FormInput name="username" />
                                <FormInput name="email" type="email" />
                                <FormInput name="password" type="password" />
                                <FormInput
                                    name="confirmPassword"
                                    type="password"
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    loading={isSubmitting}
                                >
                                    Sign Up
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Main>
        </Container>
    );
};

export default SignUp;
