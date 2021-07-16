import { CreateBookInput } from "@inputs/CreateBookInput";
import { UpdateBookInput } from "@inputs/UpdateBookInput";
import { Book } from "@models/Book";
import { Resolver, Query, Arg, Mutation } from "type-graphql";

@Resolver()
export class BookResolver {
    @Query(() => [Book])
    books() {
        return Book.find();
    }

    @Mutation(() => Book)
    async createBook(@Arg("data") data: CreateBookInput) {
        const book = Book.create(data);
        await book.save();
        return book;
    }

    @Query(() => Book)
    book(@Arg("id") id: string) {
        return Book.findOne({ where: { id } });
    }

    @Mutation(() => Book)
    async updateBook(
        @Arg("id") id: string,
        @Arg("data") data: UpdateBookInput
    ) {
        const book = await Book.findOne({ where: { id } });
        if (!book) throw new Error("Book not found!");
        Object.assign(book, data);
        await book.save();
        return book;
    }
}
