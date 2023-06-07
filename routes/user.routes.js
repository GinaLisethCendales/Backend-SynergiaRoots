const userController = require('../controllers/user.controller');
const jwt = require('../middlewares/jwt');
const auth = require('../middlewares/auth');
const express = require("express");
const router = express.Router();




//obtener todos
router.get("/users", jwt.verifyToken, userController.Getuser);
//obtener uno 
router.get("/users/:id", jwt.verifyToken, userController.Getuser);
//insertar 
router.post("/users", userController.Insertuser);
//actualizar
router.put("/users/:id", jwt.verifyToken, userController.Updateuser);
//eliminar 
router.delete("/users/:id", jwt.verifyToken, auth.validarRol , userController.Deleteuser);
//autenticar 
router.post("/users/login", userController.login);

module.exports = router;