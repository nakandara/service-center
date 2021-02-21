module.exports = function(app) {
    const {Auth} = require('../middleware/superagent');
    const { Agent } = require('../middleware/agent');

    const  AgentController = require("../controllers/AgentController");

    app.post("/create_service_tag",[Auth,Agent] ,AgentController.createServiceTag);
    app.get("/services_tags", [Auth, Agent], AgentController.getAllServiceTags);
    app.post("/create_service", [Auth, Agent], AgentController.createService);
    app.get("/services", [Auth], AgentController.getAllServices);
    app.get("/service/:id", [Auth],AgentController.getServiceById);
    app.put("/update_service/:id", [Auth,Agent ],  AgentController.updateService);
    app.delete("/delete_service/:id", [Auth, Agent],  AgentController.deleteService);
    //app.view("/view_appoinment/:date", [Auth, Agent],  AgentController.viewappoinment);
    
    //app.post("/login", SuperagentController.loginUser);
    //app.get("/user", Auth, SuperagentController.getUserDetails);
};