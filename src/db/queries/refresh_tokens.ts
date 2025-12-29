import { NewRefreshToken, RefreshToken, refreshTokens } from "../schema.js";
import { db } from "../index.js";
import { eq } from "drizzle-orm";

export async function createRefreshToken(token: NewRefreshToken): Promise<NewRefreshToken> {
    const [result] = await db
        .insert(refreshTokens)
        .values(token)
        .onConflictDoNothing()
        .returning();
    return result;
}

export async function getRefreshToken(token: string): Promise<RefreshToken | undefined> {
    const results = await db.select().from(refreshTokens).where(eq(refreshTokens.token, token));

    if (results.length === 0) {
        return;
    }

    return results[0];
}

export async function revokeToken(token: string): Promise<void> {
    const today = new Date;
    await db.update(refreshTokens).set({revokedAt: today, updatedAt: today}).where(eq(refreshTokens.token, token));
}
