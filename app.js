const express = require('express');
const dbSetup = require('./db/db-setup');
const CheckIn = require('./db/models/checkin');

const Empleados = require('./db/models/empleados');
const app = express()
const port = 3000

var moment = require('moment')
var momentTZ = require('moment-timezone')

dbSetup()

app.use(express.json())


// EMPLEADOS ----------------------------------------
app.get('/api/v1/empleados', async (resp, res) => {
  try {
        let all = await Empleados.query().select('*')
        res.status(200).json(all)
  } catch (error) {
      res.status(500).json(error)
  }
});

app.post('/api/v1/empleados', async (req, res) => {
  let reqData = req.body
    try {
        let insertEmpleado = await Empleados.query().insert({
            nombres: reqData.nombres,
            apellido_paterno: reqData.apellido_paterno,
            apellido_materno: reqData.apellido_materno,
            sueldo_semanal: reqData.sueldo_semanal,
            id_empleados: await makeid(),
            puesto: reqData.puesto
        })
    
        res.json(insertEmpleado);   
    } catch (error) {
        res.status(500).json(error)
    }
});

app.get('/api/v1/empleados/:id',  async (req, res) => {
  try {
      let id = req.params.id
      const empleado = await Empleados.query().findById(id)
      res.json(empleado)    
  } catch (error) {
      res.status(500).json(error)
  }
});

app.put('/api/v1/empleados/:id', async (req, res) => {
  let id = req.params.id
  let reqData = req.body
  if (!isNaN(id)) {
      let update = await Empleados.query().update({
        nombres: reqData.nombres,
        apellido_paterno: reqData.apellido_paterno,
        apellido_materno: reqData.apellido_materno,
        sueldo_semanal: reqData.sueldo_semanal,
        puesto: reqData.puesto
    }).where({id: id})
      res.status(200).json(update)
  } else {
      res.json({success: false, message: "ID is non a Number"})
  }
})

app.delete('/api/v1/empleados/:id', async (req, res) =>{
  let id = req.params.id
  if (!isNaN(id)) {
    let del = await Empleados.query().del().where({id: id})
    res.json(del);    
  } else {
      res.json({success: false, message: "ID no es valido"})
  }
})
// ------------------------------------------------------

// CHECKIN--------------------------------------------

app.post('/api/v1/entrada/:idempleado', async(req, res)=>{
  let timeInit = await getDate('end')
  let idEmpleado = req.params.idempleado
  let exist = await CheckIn.query().select('id').where('hora_inicio', `like`, `%${timeInit}%`)
  if(exist){
    res.status(401).json({message: 'Empleado ya marco inicio de dia.'});
  } else {
    let start = await CheckIn.query().insert({
      id_empleado: idEmpleado,
      hora_inicio: timeInit,
    })
  
    res.status(200).json(start);
  }
})

app.put('/api/v1/salida/:idempleado', async(req, res) => {
  let timeInit = await getDate('end')
  let idEmpleado = req.params.idempleado
  let end = await CheckIn.query().update({
    hora_salida: new Date().toISOString() // new Date().toLocaleDateString();
  }).where({id_empleado: idEmpleado}).where('hora_inicio', `like`, `%${timeInit}%`)
  res.status(200).json(end);
})
// ---------------------------------------------------------



// UTILITYS
async function makeid() {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz';
  var numbers = '0123456789'
  var special = `/.,;@#$%&*!?`
  for ( var i = 0; i < 12; i++ ) {
    if( i < 4) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if( i < 8 && i >= 4) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    if( i < 12 && i >= 8) {
      result += special.charAt(Math.floor(Math.random() * special.length));
    }
    
  }
 return result;
}

async function getDate(tipe) {
  let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timeInit
    if (tipe == 'init') {
      timeInit = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    } else {
      timeInit = year + "-" + month + "-" + date + " "
    }
    return timeInit
}


app.listen(port, () => {
  console.log(`Run in port: ${port}`)
})