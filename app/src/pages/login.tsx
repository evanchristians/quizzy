import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { useLoginUserMutation } from "../generated/types";
import { LoginSchema } from "../utils/validationSchema";

const Login = () => {
    const [loginUser] = useLoginUserMutation({});

    const handleSubmit = async ({ email, password }) => {
        try {
            await loginUser({
                variables: {
                    loginUserData: {
                        email,
                        password,
                    },
                },
            });
        } catch (err) {
            return { error: err.message };
        }
    };

    return (
        <Container>
            <Hero title="Login" />
            <Main>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        const { error } = await handleSubmit(values);
                        if (error) setErrors({ email: error });
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Stack spacing="2rem">
                                <FormInput name="email" type="email" />
                                <FormInput name="password" type="password" />
                                <Button
                                    type="submit"
                                    size="lg"
                                    loading={isSubmitting}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Main>
        </Container>
    );
};

export default Login;
