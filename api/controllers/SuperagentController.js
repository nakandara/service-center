const { User } = require("../models/UserModel");
const { Agent } = require("../models/AgentModel");
const { Customer } = require("../models/CustomerModel");

exports.registerUser = async (req, res) => {
    const user = new User(req.body);

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

exports.loginUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if(!user){
          return res.status(200).json({
            success: false,
            message: "user email not found!"
          });
      }
      user.comparePassword(req.body.password,(err,isMatch) => {
          if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "password is incorect!"
              });
          }
          user.generateToken((err,token) => {
                if(err){
                    return res.status(400).json({
                        success: false,
                        message: "unable to genarate jwt key!",
                        data:err
                      }); 
                }
                return res.status(200).json({
                    success: false,
                    message: "Successfully logged in!",
                    data:{
                        "token":token
                    }
                  });

          });

          
      });
    });
}

exports.getUserDetails = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User Received!",
        data:req.user
            
        
      });

}

exports.getAllAgent = async (req, res) => {
    await Agent.find(function(err, agent) {
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
            data: agent
        });
    });
};
exports.createAgent = async (req, res) => {
    await ServiceTag.findById(req.body.service_tag, async function(err, serviceTag) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service tag id!"
            });
        }

        if(!serviceTag) {
            return res.status(422).json({
                success: false,
                message: "Invalid service tag id!"
            });
        }

        var newAgent = new Agent(req.body);

        newAgent.agent = req.user._id;

        await newAgent.save((err, agent) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: "Unable to create Agent!",
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "New Agent is created!",
                    data: agent
                });
            }
        });
    });
};
exports.deleteAgent = async (req, res) => {
    await Agent.remove({_id: req.params.id}, function(err, agent) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid vehicle id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Vehicles deleted!"
        });
    });
};

exports.getCustomerDetailsById = async (req, res) => {
    await Customer.findById(req.params.id, async function(err, customer) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid customer id!"
            });
        }

        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid customer id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Customer received!",
            data: customer
        });
    });
};
exports.updateCustomerById = async (req, res) => {
    await Customer.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, customer) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid customer id!"
            });
        }

        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid Customer id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Customer updated!",
            data: customer
        });
    });
};

exports.deletecustomer = async (req, res) => {
    await Customer.remove({_id: req.params.id}, function(err, customer) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid customer id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "customer deleted!"
        });
    });
};