import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id');
    table.string('userId', 255).notNullable().references('users.userId');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.integer('priority').notNullable();
    table.integer('dueDate').notNullable();
    table.integer('created_at').notNullable();
    table.integer('updated_at');
    table.integer('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todos');
}
