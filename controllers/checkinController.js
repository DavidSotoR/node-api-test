var moment = require('moment')
var momentTZ = require('moment-timezone')

const checkInitDay = async (req, res, next) => {

    let time = moment(Date.now()).utc().format("MM/DD HH:mm")
    let date_ob = momentTZ.tz(time, 'America/Monterrey');
    try {
        let initDay = {
            empleado: req.params.id,
            initDay: date_ob.format(),
        }
    
        res.status(200).json(initDay);   
    } catch (error) {
        res.status(500).json(error)
    }
}

const checkEndDay = async (req, res, next) => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timeInit = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    try {
        let endDay = {
            empleado: req.params.id,
            initDay: timeInit,
        }
    
        res.status(200).json(endDay);   
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.module = {
    checkEndDay, checkInitDay
};
