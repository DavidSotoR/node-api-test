var express = require('express');
const Empleados = require('../db/models/empleados');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});


// define the about route
router.get('/users', async (req, res) => {
    try {
        const users = await Empleados.query().select('*')
        res.json(users)    
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/users', async (req, res) => {
    let reqData = req.body
    try {
        let insertUsert = await Empleados.query().insert({
            nombres: reqData.nombres,
            apellido_paterno: reqData.apellido_paterno,
            apellido_materno: reqData.apellido_materno,
            sueldo_semanal: reqData.sueldo_semanal,
            id_empleados: 'abcd1234=-/.',
            puesto: reqData.puesto
        })
    
        res.json(insertUsert);   
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const user = await Empleados.query().findById(id)
        res.json(user)    
    } catch (error) {
        res.status(500).json(error)
    }
    
})

router.put('/users/:id', function(req, res) {
    let id = req.params.id
    if (!isNaN(id)) {

    } else {
        res.json({success: false, message: "ID is non a Number"})
    }
    
});

router.delete('/users/:id', function(req, res) {
    let id = req.params.id
    let response = {
        success: Boolean,
        message: String
    }
    if (!isNaN(id)) {
        response.success = true
        response.message = `Usuario ID: ${id} se ha eliminado.`
        res.json(response);    
    } else {
        res.json({success: false, message: "ID is non a Number"})
    }
    
});

module.exports = router;