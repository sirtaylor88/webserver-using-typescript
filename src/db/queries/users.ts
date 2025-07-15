import { db } from "../index.js";
import { NewUser, users } from "../schema.js";

export async function createUser(user: NewUser): Promise<NewUser> {
    const [result] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    return result;
}

export async function deleteUsers(): Promise<void> {
    await db.delete(users);
}
