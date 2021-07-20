import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HTMLChakraProps,
    Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import { toSentence } from "../utils/stringToSentence";

export interface FormInputProps extends HTMLChakraProps<"div"> {
    name: string;
    label?: string;
    type?: string;
}

export const FormInput = (props: FormInputProps) => {
    const { name, label, type = "text" } = props;
    return (
        <Field name={name}>
            {({ field, form }) => {
                return (
                    <Box {...props}>
                        <FormControl
                            isInvalid={form.errors[name] && form.touched[name]}
                        >
                            <FormLabel
                                fontSize={14}
                                fontWeight="normal"
                                htmlFor={name}
                            >
                                {label ?? toSentence(name)}
                            </FormLabel>
                            <Input
                                size="lg"
                                {...field}
                                id={name}
                                placeholder={label ?? toSentence(name)}
                                type={type}
                            />
                            <Flex alignItems="flex-end" minHeight={6} mb={2}>
                                <FormErrorMessage mt={0}>
                                    {form.errors[name]}
                                </FormErrorMessage>
                            </Flex>
                        </FormControl>
                    </Box>
                );
            }}
        </Field>
    );
};
