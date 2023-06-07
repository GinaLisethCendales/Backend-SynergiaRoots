const orderController = require('../controllers/order.controller');
const jwt = require('../middlewares/jwt')
const express = require("express");
const router = express.Router();





//obtener todos
router.get("/orders",orderController.Getorder);
//obtener uno 
router.get("/orders/:id",orderController.Getorder);
//insertar 
router.post("/orders",jwt.verifyToken, orderController.Insertorder);
//actualizar
router.put("/orders/:id",jwt.verifyToken, orderController.Updateorder);
//eliminar 
router.delete("/orders/:id",jwt.verifyToken, orderController.Deleteorder);

module.exports = router;