var express = require("express");
var router = express.Router();
var respostaController = require("../controllers/respostaController");

router.post("/cadastrar", respostaController.cadastrar);

module.exports = router;
