const notableController = require("../controllers/notable.controller");

module.exports = (app) => {
    app.post("/api/notable", notableController.createNewNotable);
    app.get("/api/notable", notableController.getAllNotables);
    app.get("/api/notable/:id", notableController.getOneNotable);
    app.put("/api/notable/:id", notableController.updateNotable);
    app.delete("/api/notable/:id", notableController.deleteNotable);
    };