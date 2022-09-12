
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
  .createTable('checkin', (table) => {
    table.increments().primary();
    table.string('id_empleado').notNullable();
    table.string('hora_inicio');
    table.string('hora_salida');
    table.integer('horas_trabajadas')
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('empleados').dropTableIfExists('checkin')
};
