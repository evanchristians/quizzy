import { CreateUserInput } from "@inputs/CreateUserInput";
import { LoginUserInput } from "@inputs/LoginUserInput";
import { UpdateUserInput } from "@inputs/UpdateUserInput";
import { User } from "@models/User";
import { Auth } from "@utils/AuthHelpers";
import bcrypt from "bcrypt";
import {
    Arg,
    Ctx,
    Mutation,
    Publisher,
    PubSub,
    Query,
    Resolver,
    Subscription,
} from "type-graphql";
import { MoreThan } from "typeorm";
import { Context } from "~/context";
import { FieldError } from "~/errors/FieldError";

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
        const existingUserEmail = await User.findOne({
            where: { email: data.email },
        });
        const existingUsername = await User.findOne({
            where: { username: data.username },
        });

        if (existingUserEmail)
            return new FieldError(
                "This email address is already taken!",
                "email"
            );

        if (existingUsername)
            return new FieldError(
                "This username is already taken!",
                "username"
            );

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

        if (!user)
            throw new FieldError(
                "User not found! Try again, you fucking idiot.",
                "email"
            );

        if (!bcrypt.compareSync(data.password, user.password)) {
            throw new FieldError("Incorrect Password!", "password");
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
            throw new FieldError("User not found!", "id");
        }

        Object.assign(user, data);
        await user.save();

        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: string) {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            throw new FieldError("User not found!", "id");
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

        if (user) user = undefined;

        return true;
    }

    @Mutation(() => Boolean)
    async updateLastSeen(
        @Ctx() { user }: Context,
        @PubSub("ONLINE_USERS") publish: Publisher<User>
    ) {
        if (!user) return false;
        user.last_seen = new Date();
        await user.save();
        await publish(user);

        return true;
    }

    @Subscription(() => [User], { topics: "ONLINE_USERS" })
    async getOnlineUsers(): Promise<User[]> {
        const users = await User.find({
            where: {
                last_seen: MoreThan(new Date(new Date().getTime() - 30 * 1000)),
            },
        });

        return users;
    }
}
