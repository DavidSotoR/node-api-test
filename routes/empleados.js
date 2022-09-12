const empleadosController = require('../controllers/empleadosController')
const router = require('express').Router();

// define the about route
router.get('/empleados', function (req, res) {
    empleadosController.getAllEmpleados(req, res)
});

routerEmpleados.post('/empleados', (req, res, next) => {
    Empleados.createEmpleado()
});

routerEmpleados.get('/empleados/:id', (req, res, next) => {
    Empleados.getEmpleadoID()
})

routerEmpleados.put('/empleados/:id', (req, res, next) => {
    Empleados.updateEmpleadoID()
});

routerEmpleados.delete('/empleados/:id', (req, res, next) => {
    Empleados.deleteEmpleadoID()
});

module.exports = router;