import { defineDb, defineTable, column } from 'astro:db';

const WaitlistToken = defineTable({
  columns: {
    token: column.text({ primaryKey: true }),
    valid: column.boolean(),
  },
});

const WaitingUser = defineTable({
  columns: {
    email: column.text({ primaryKey: true }),
  },
});
// https://astro.build/db/config
export default defineDb({
  tables: { WaitlistToken, WaitingUser }
});
