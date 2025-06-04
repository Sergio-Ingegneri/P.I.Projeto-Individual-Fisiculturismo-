var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/totalUsuarios", dashboardController.pegarTotalUsuarios);
router.get("/kpi/:id", dashboardController.pegarKpi);
router.get("/radar/:id", dashboardController.pegarRadar);

module.exports = router;
