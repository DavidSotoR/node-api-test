const Empleados = require('../db/models/empleados');
var controllador = {}

controllador.getAllEmpleados = async (req, res) => {
    let all = await Empleados.query().select('*')
    res.status(200).json(all)
}
/* const getAllEmpleados = async (req, res) => {
    try {
        Empleados.query().select('*').then((empleados)=>{
            res.status(200).json(empleados)
        })
            
    } catch (error) {
        res.status(500).json(error)
    }
}; */

const createEmpleado = async (req, res) => {
    let reqData = req.body
    try {
        let insertUsert = await Empleados.query().insert({
            nombres: reqData.nombres,
            apellido_paterno: reqData.apellido_paterno,
            apellido_materno: reqData.apellido_materno,
            sueldo_semanal: reqData.sueldo_semanal,
            id_empleados: 'lmki1234=-/.',
            puesto: reqData.puesto
        })
    
        res.json(insertUsert);   
    } catch (error) {
        res.status(500).json(error)
    }
};

const getEmpleadoID = async (req, res) => {
    try {
        let id = req.params.id
        const user = await Empleados.query().findById(id)
        res.json(user)    
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const updateEmpleadoID = async (req, res) => {
    let id = req.params.id
    if (!isNaN(id)) {
        res.json({success: true, message: 'Se actualizo'})
    } else {
        res.json({success: false, message: "ID is non a Number"})
    }
}

const deleteEmpleadoID = async (req, res) => {
    let id = req.params.id
    let response = {
        success: Boolean,
        message: String
    }
    if (!isNaN(id)) {
        response.success = true
        response.message = `Empleado ID: ${id} se ha eliminado.`
        res.json(response);    
    } else {
        res.json({success: false, message: "ID is non a Number"})
    }
    
}
module.exports = controllador
/* exports.module = {
    deleteEmpleadoID, getAllEmpleados, getEmpleadoID, createEmpleado, updateEmpleadoID
};
 */