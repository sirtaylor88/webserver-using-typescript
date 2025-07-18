import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { Chirp, chirps, NewChirp } from "../schema.js";
import { NotFoundError } from "../../errors.js";

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

export async function getChirp(chirpID: string): Promise<Chirp> {
    const results = await db.select().from(chirps).where(eq(chirps.id, chirpID));
    if (results.length === 0) {
        throw new NotFoundError(`Chirp with ID = ${chirpID} not found!`);
    }
    return results[0];
}
