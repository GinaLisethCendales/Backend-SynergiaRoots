const userController = require('../controllers/user.controller');
const userTemplate = require('../templates/users.template');
const jwt = require('../middlewares/jwt');
const auth = require('../middlewares/auth');
const express = require("express");
const router = express.Router();




//RenderUsers
router.get("/users/table", userTemplate.RenderUsers);
//insertar 
router.post("/users", userController.Insertuser);
//autenticar 
router.post("/users/login", userController.login);

//obtener todos
router.get("/users", jwt.verifyToken, userController.Getuser);
//obtener uno 
router.get("/users/:id", jwt.verifyToken, userController.Getuser);
//actualizar
router.put("/users/:id", jwt.verifyToken, userController.Updateuser);
//eliminar 
router.delete("/users/:id", jwt.verifyToken , userController.Deleteuser);


module.exports = router;