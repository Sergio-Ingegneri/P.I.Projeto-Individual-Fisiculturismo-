var express = require("express");
var router  = express.Router();
var dashCtrl = require("../controllers/dashboardController");

router.get("/dados/:idUsuario", dashCtrl.obterDados);

module.exports = router;
