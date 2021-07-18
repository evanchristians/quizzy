import { CreateUserInput } from "@inputs/CreateUserInput";
import { LoginUserInput } from "@inputs/LoginUserInput";
import { UpdateUserInput } from "@inputs/UpdateUserInput";
import { User } from "@models/User";
import { Auth } from "@utils/AuthHelpers";
import bcrypt from "bcrypt";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "~/context";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find();
    }

    @Query(() => User)
    user(@Arg("id") id: string) {
        return User.findOne({ where: { id } });
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() { user }: Context) {
        return user;
    }

    @Mutation(() => User)
    async createUser(
        @Arg("data") data: CreateUserInput,
        @Ctx() { res }: Context
    ) {
        const password = bcrypt.hashSync(data.password, 10);
        const user = User.create({ ...data, password });
        await user.save();

        const { token } = Auth(user);
        res.cookie("token", token, { sameSite: "none", secure: true });

        return user;
    }

    @Mutation(() => User)
    async loginUser(
        @Arg("data") data: LoginUserInput,
        @Ctx() { res }: Context
    ) {
        const user = await User.findOne({ where: { email: data.email } });

        if (!user) throw new Error("User not found!");
        if (!bcrypt.compareSync(data.password, user.password)) {
            throw new Error("Incorrect Password!");
        }

        const { token } = Auth(user);
        res.cookie("token", token, { sameSite: "none", secure: true });

        return user;
    }

    @Mutation(() => User)
    async updateUser(
        @Arg("id") id: string,
        @Arg("data") data: UpdateUserInput
    ) {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            throw new Error("User not found!");
        }

        Object.assign(user, data);
        await user.save();

        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: string) {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            throw new Error("User not found!");
        }

        await user.remove();

        return true;
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res, user }: Context) {
        res.clearCookie("token", {
            sameSite: "none",
            secure: true,
        });

        if (user) {
            user = undefined;
        }

        return true;
    }
}
