const {Model} = require('objection');

class CheckIn extends Model {
    static get tableName() {
        return 'checkin'
    }
}

module.exports = CheckIn