const moment = require('moment');

class MPG {
    constructor(miles, gallons, total, notes = null) {
        this.miles = miles;
        this.gallons = gallons;
        this.total = total;
        this.notes = notes;

        this.miles_per_gallon = gallons <= 0 ? 0 : (miles / gallons);
        this.cost_per_gallon = gallons <= 0 ? 0 :(total / gallons);
        this.created = new Date();
        this.columns = ['created', 'miles', 'gallons', 'total', 'miles_per_gallon', 'cost_per_gallon', 'notes'];
        this.values = this.columns.map(val => this[val])
    }

    validate(){
        if (this.miles < 0) {
            throw `Miles cannot be less than 0. Current value: ${this.miles}`;
        } else if (this.gallons < 0) {
            throw `Gallons cannot be less than 0. Current value: ${this.gallons}`;            
        } else if (this.total < 0) {
            throw `Total cannot be less than 0. Current value: ${this.total}`;            
        }
    }
}

module.exports = MPG;