
exports.seed = async function(knex) {
  // TRUNCATE TABLE
  await knex.raw('TRUNCATE TABLE empleados')
 
  await knex('empleados').insert([{
    id: 1,
    id_empleados: 'disr1234#@!-',
    nombres: 'David Isai',
    apellido_paterno: 'Soto',
    apellido_materno: 'Resendiz',
    puesto: 'desarrollador backend',
    sueldo_semanal: 15000.00,
  }])
};
