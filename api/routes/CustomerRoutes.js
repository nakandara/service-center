module.exports = function(app) {
    const { Auth } = require("../middleware/superagent");
    const { Customer } = require("../middleware/customer");

    const CustomerController = require("../controllers/CustomerController");
    
    app.get("/agent/:id", [Auth, Customer], CustomerController.viewAgentById);
    app.post("/search_services", [ Auth,Customer], CustomerController.searchServices);
    app.post("/add_vehicles",[Customer],CustomerController.addvehicles);
    app.put("/update_vehicles/:id", [Auth,Customer ],  CustomerController.updateVehicles);
    app.delete("/delete_vehicles/:id", [Auth, Customer],  CustomerController.deleteVehicles);
    app.post("/new_appoinment",[Auth,Customer],CustomerController.newappoinment);
    app.post("/make_payment",[Auth,Customer],CustomerController.makePayment);
};