# Prisma None Panic

## SQL

```sql
CREATE TABLE codes (
    id text PRIMARY KEY,
    type text NOT NULL,
    "userId" text REFERENCES users(id) ON DELETE CASCADE,
    "singleUse" boolean NOT NULL,
    "createdById" text REFERENCES users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX codes_pkey ON codes(id text_ops);

CREATE TABLE users (
    id text DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text,
);

CREATE UNIQUE INDEX users_pkey ON users(id text_ops);
```

## Good Schema

```ts
model Code {
  id          String        @default(dbgenerated()) @id
  type        String
  userId      String?
  createdById String?
  createdBy   User?         @relation("created", fields: [createdById], references: [id])
  user        User?         @relation("code", fields: [userId], references: [id])

  @@map(name: "codes")
}

model User {
  id                String            @default(dbgenerated()) @id
  name              String?
  codes             Code[]            @relation("code")
  createdCodes      Code[]            @relation("created")

  @@map(name: "users")
}
```

## Bad Schema

```ts
model Code {
  id          String        @default(dbgenerated()) @id
  type        String
  singleUse   Boolean
  userId      String?
  createdById String?
  createdBy   User?
  user        User?         @relation("code", fields: [userId], references: [id])

  @@map(name: "codes")
}

model User {
  id                String            @default(dbgenerated()) @id
  name              String?
  codes             Code[]            @relation("code")

  @@map(name: "users")
}
```
