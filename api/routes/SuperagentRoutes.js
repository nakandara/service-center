module.exports = function(app) {
    const { Auth } = require('../middleware/superagent');
    //const { Agent } = require('../middleware/agent');

    const SuperagentController = require("../controllers/SuperagentController");

    app.post("/register", SuperagentController.registerUser);
    app.post("/login", SuperagentController.loginUser);
    app.get("/user", Auth, SuperagentController.getUserDetails);
    app.get("/agent",  SuperagentController.getAllAgent);
    app.post("/create_agent", Auth, SuperagentController.createAgent);
    app.delete("/delete_agent/:id", Auth, SuperagentController.deleteAgent);
    app.get("/customer/:id", Auth, SuperagentController.getCustomerDetailsById);
    app.put("/update_customer/:id", [Auth ],  SuperagentController.updateCustomerById);
    app.delete("/delete_customer/:id", [Auth],  SuperagentController.deletecustomer);

};