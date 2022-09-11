
exports.up = function(knex) {
  return knex.schema.createTable('empleados', (table) => {
    table.increments();
    table.string('id_empleados').notNullable().unique();
    table.string('nombres').notNullable();
    table.string('apellido_paterno').notNullable();
    table.string('apellido_materno').notNullable();
    table.string('puesto').notNullable();
    table.decimal('sueldo_semanal', 100, 2).notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('empleados')
};
