import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.string('password', 255).unique();
    table.string('email', 255).unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('password');
  });
}
