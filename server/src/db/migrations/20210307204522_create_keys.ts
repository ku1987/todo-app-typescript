import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('keys', (table) => {
    table.increments('id');
    table.string('accessKey', 255).unique().notNullable();
    table.string('secretKey', 255).unique().notNullable();
    table.string('userId', 255).notNullable().references('users.userId');
    table.integer('created_at').notNullable();
    table.integer('updated_at');
    table.integer('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('keys');
}
