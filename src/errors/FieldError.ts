import { ApolloError } from "apollo-server-errors";

export class FieldError extends ApolloError {
    constructor(message: string, field: string) {
        super(message, "FieldError", { field });

        Object.defineProperty(this, "name", { value: "FieldError" });
    }
}
