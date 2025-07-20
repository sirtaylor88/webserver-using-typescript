import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { NewUser, User, UserResponse, users } from "../schema.js";

export async function createUser(user: NewUser): Promise<UserResponse> {
    const [result] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    const {hashedPassword, ...userResponse} = result;
    return userResponse;
}

export async function deleteUsers(): Promise<void> {
    await db.delete(users);
}

export async function getuser(email: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.email, email))

    if (results.length === 0) {
        return;
    }

    return results[0];
}
