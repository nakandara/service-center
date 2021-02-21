const UserRole = require("../enums/UserRole");
const { User } = require("../models/UserModel");
const { Service } = require("../models/ServiceModel");
const { Vehicles } = require("../models/VehiclesModel");

//const { Customer } = require("../middleware/customer");
const { Payment } = require("../models/PaymentModel");
const { Appoinment } = require("../models/AppoinmentModel");

exports.searchServices = (req, res) => {
    var searchString = req.body.term;

    if(!searchString) {
        return res.status(422).json({
            success: false,
            message: "Serach term is required!"
        });
    }
    
    Service.find({
        $or: [
            {title: {$regex: searchString, $options: 'i'}},
            {description: {$regex: searchString, $options: 'i'}}
        ]
    }, function(err, services){
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Error filteting services!",
                data: err
            });
        }

        return res.status(422).json({
            success: true,
            message: "Filtered services!",
            data: services
        });
    });
};
exports.viewAgentById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, agent) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid agent id!"
            });
        }

        if(! agent) {
            return res.status(422).json({
                success: false,
                message: "Invalid agent id!"
            });
        }

        if( agent.role != UserRole.AGENT) {
            return res.status(422).json({
                success: false,
                message: "Invalid agent id!"
            });
        }
        
        return res.status(422).json({
            success: true,
            message: "agent received!",
            data: agent
        });
    });
};
/*exports.getAllServices = async (req, res) => {
    await Service.find(function(err, services) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive services!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received services!",
            data: services
        });
    });
};*/

/*exports.addvehicles = async (req, res) =>{
    var newVehicles = new Vehicles(req.body);

    newVehicles.customer = req.user._id;

        await  newVehicles.save((err, vehicles) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: "Unable to create vehicles!",
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "New service is vehicles!",
                    data: vehicles
                });
            }
        });
};
exports.addvehicles = async (req, res) => {
    const vehicles = new Vehicles(req.body);

    await user.save((err, doc) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "registration failed",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully registerd!"
            });
        }
    });
}
exports.addvehicles = async (req, res) => {
    await Vehicles.findById({_id: req.params.id}, req.body, {new: true}, function(err, vehicles) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        if(!vehicles) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Service updated!",
            data: vehicles
        });
    });
};*/

exports.addvehicles = async (req, res) => {
    let newVehicles = new Vehicles(req.body);

    await newVehicles.save((err, vehicles) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create Vehicle!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New Vehicle is created!",
                data: vehicles
            });
        }
    });
};



exports.updateVehicles = async (req, res) => {
    await Vehicles.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, vehicles) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid vehicle id!"
            });
        }

        if(!vehicles) {
            return res.status(422).json({
                success: false,
                message: "Invalid vehicle id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "vehicle updated!",
            data: vehicles
        });
    });
};

exports.deleteVehicles = async (req, res) => {
    await Vehicles.remove({_id: req.params.id}, function(err, vehicles) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid vehicle id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "vehicle deleted!"
        });
    });
};
exports.newappoinment = async (req, res) => {
let newAppointment = new Appointment(req.body);

    await newAppointment.save((err, appointment) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create appointment!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New Appointment is created!",
                data: appointment
            });
        }
    });
};
exports.makePayment = async (req, res) => {
    let newPayment = new Payment(req.body);

    await newPayment.save((err, payment) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create payment!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New payment is created!",
                data: payment
            });
        }
    });
};