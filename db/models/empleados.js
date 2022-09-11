const {Model} = require('objection');

class Empleados extends Model {
    static get tableName() {
        return 'empleados'
    }
}

module.exports = Empleados