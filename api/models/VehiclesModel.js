var mongoose = require('mongoose');




var Schema = mongoose.Schema;

var VehiclesSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required: [true, 'customer field is required!']
        
    },
    
    vehicle_details: {
        type: String,
        required: [true, 'vehicle_brand field is required!']
    },
    
    
});

const Vehicles = mongoose.model('Vehicles', VehiclesSchema);
module.exports = { Vehicles }