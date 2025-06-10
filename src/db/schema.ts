import { pgTable, text, timestamp, serial } from 'drizzle-orm/pg-core';

export const alerts = pgTable('alerts', {
  id: serial('id').primaryKey(),
  syftenId: text('syften_id').unique(),
  clientTag: text('client_tag'),
  source: text('source'),
  author: text('author'),
  text: text('text'),
  itemUrl: text('item_url'),
  matchedOn: timestamp('matched_on').defaultNow(),
}); 