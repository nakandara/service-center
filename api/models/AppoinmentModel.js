var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppoinmentModelSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer',
        required: [true, 'Customer field is required!']
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service',
        required: [true, 'Service field is required!']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'payment_done', 'completed'],
        required: [true, 'Status field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    vehicles: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicles',
        required: [true, 'Vehicles field is required!']
    },
});

const Appoinment = mongoose.model('Appoinment',  AppoinmentModelSchema);
module.exports = { Appoinment }