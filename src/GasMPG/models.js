const moment = require('moment');
class MPG {
    constructor(miles, gallons, total, notes = null) {
        this.miles = miles;
        this.gallons = gallons;
        this.total = total;
        this.miles_per_gallon = (miles / gallons);
        this.cost_per_gallon = (total / gallons);
        this.notes = notes;
        this.created = new Date();
        this.columns = ['created', 'miles', 'gallons', 'total', 'miles_per_gallon', 'cost_per_gallon', 'notes'];
        this.values = this.columns.map(val => this[val])
    }
}

exports.MPG = MPG