import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Main } from "../components/Main";
import { SignupSchema } from "../utils/validationSchema";

const SignUp = () => {
    return (
        <Container>
            <h1>Signup</h1>
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
                    <FormInput name="firstName" />
                    <FormInput name="email" />
                    <Button >Submit</Button>
                </Form>
            </Formik>
        </Container>
    );
};

export default SignUp;
