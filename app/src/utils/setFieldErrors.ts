import { GraphQLError } from "graphql";

export const setFieldErrors = (
    callback: CallableFunction,
    errors: Array<GraphQLError>
) => {
    errors.forEach((error) => {
        callback(error.extensions.field, error.message);
    });
};
