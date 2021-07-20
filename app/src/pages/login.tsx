import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { MeDocument, MeQuery, useLoginUserMutation } from "../generated/types";
import { setFieldErrors } from "../utils/setFieldErrors";
import { LoginSchema } from "../utils/validationSchema";

const Login = () => {
    const router = useRouter();
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
                update: (cache, response) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: "Query",
                            me: response.data.loginUser,
                        },
                    });
                },
            });
            return { errors: null };
        } catch (err) {
            return { errors: err.graphQLErrors };
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
                    onSubmit={async (
                        values,
                        { setSubmitting, setFieldError }
                    ) => {
                        const { errors } = await handleSubmit(values);
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
                                <FormInput
                                    gridColumn="span 2"
                                    name="email"
                                    type="email"
                                />
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
