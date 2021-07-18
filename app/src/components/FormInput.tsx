import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import { toSentence } from "../utils/stringToSentence";

export interface FormInputProps {
    name: string;
    label?: string;
    type?: string;
}

export const FormInput = ({ name, label, type = "text" }: FormInputProps) => {
    return (
        <Field name={name}>
            {({ field, form }) => {
                return (
                    <FormControl
                        isInvalid={form.errors[name] && form.touched[name]}
                    >
                        <FormLabel htmlFor={name}>
                            {label ?? toSentence(name)}
                        </FormLabel>
                        <Input
                            size="lg"
                            {...field}
                            id={name}
                            placeholder={label ?? toSentence(name)}
                            type={type}
                        />
                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </FormControl>
                );
            }}
        </Field>
    );
};
