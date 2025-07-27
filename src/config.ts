import { env, loadEnvFile } from "node:process";
import type { MigrationConfig } from "drizzle-orm/migrator";

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations",
};

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
}

type APIConfig = {
    fileserverHits: number;
    platform: string;
    jwtSecret: string;
    db: DBConfig;
};

loadEnvFile();

function envOrThrow(key: string) {
    if (!env[key]) {
        throw new Error(`Env variable ${key} does not exist.`);
    }
    return env[key];
}

export const config: APIConfig = {
    fileserverHits: 0,
    platform: envOrThrow('PLATFORM'),
    jwtSecret: envOrThrow('JWT_SECRET'),
    db: {
        url: envOrThrow('DB_URL'),
        migrationConfig: migrationConfig,
    }
}
