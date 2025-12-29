import { pgTable, timestamp, varchar, uuid, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    email: varchar('email', { length: 256 }).unique().notNull(),
    hashedPassword: varchar('hashed_password', { length: 256 }).notNull().default('unset'),
});

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type UserResponse = Omit<User, "hashedPassword">;

export const chirps = pgTable('chirps', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    body: text('body').notNull(),
    userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
});

export type NewChirp = typeof chirps.$inferInsert;
export type Chirp = typeof chirps.$inferSelect

export const refreshTokens = pgTable('refresh_tokens', {
    token: text('token').primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
    expiredAt: timestamp('expired_at').notNull(),
    revokedAt: timestamp('revoked_at'),
});

export type NewRefreshToken = typeof refreshTokens.$inferInsert;
export type RefreshToken = typeof refreshTokens.$inferSelect;
