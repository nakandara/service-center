var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentModelSchema = new Schema({
    Appoinment: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Appoinment',
        required: [true, 'Appoinment field is required!']
    },
    amount: {
        type: Number,
        required: [true, 'Amount field is required!']
    },
    status: {
        type: String,
        enum: ['pending', 'processed', 'completed', 'failed'],
        required: [true, 'Status field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', PaymentModelSchema);
module.exports = { Payment }