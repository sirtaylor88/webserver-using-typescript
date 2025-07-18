import { db } from "../index.js";
import { Chirp, chirps, NewChirp } from "../schema.js";

export async function createChirp(chirp: NewChirp): Promise<NewChirp> {
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .onConflictDoNothing()
        .returning();
    return result;
}

export async function getChirps(): Promise<Chirp[]> {
    const results = await db.select().from(chirps).orderBy(chirps.createdAt);
    return results;
}
