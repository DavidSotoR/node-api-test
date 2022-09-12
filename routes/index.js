const router = require('express').Router();
const routerEmpleados = require('./empleados')
const routerCheckIn = require('./checkin')

router.use('/empleados', routerEmpleados)
router.use('/checkin', routerCheckIn)

module.exports = router