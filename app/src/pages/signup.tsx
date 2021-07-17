import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { SignupSchema } from "../utils/validationSchema";

const SignUp = () => {
    return (
        <Container>
            <Hero title="Sign Up" />
            <Main>
                <Formik
                    initialValues={{
                        firstName: "",
                        email: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    <Form>
                        <Stack spacing="2rem">
                            <FormInput name="firstName" />
                            <FormInput name="email" />
                            <Button size="lg">Submit</Button>
                        </Stack>
                    </Form>
                </Formik>
            </Main>
        </Container>
    );
};

export default SignUp;
