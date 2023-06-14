const productController = require('../controllers/product.controller');
const productTemplate = require('../templates/products.template');
const jwt = require("../middlewares/jwt")
const uploadController = require("../utils/UploadFile")
const express = require("express");
const router = express.Router();



router.get("/", function (req, res) {
    res.send("Hola desde node");
  });

//obtener todos
router.get("/products",productController.GetProducts);
//obtener todos tabla
router.get("/products/table",productTemplate.renderProducts);
//obtener todos cards
router.get("/products/cards",productTemplate.renderCardProducts);
//obtener uno 
router.get("/products/:id",productController.GetProducts);
//insertar 
router.post("/products", jwt.verifyToken, productController.InsertProduct);
//actualizar
router.put("/products/:id", jwt.verifyToken, productController.UpdateProduct);
//eliminar 
router.delete("/products/:id", jwt.verifyToken, productController.DeleteProduct);
//cargarProducto
router.post('/products/upload', uploadController.upload.single('file'), uploadController.uploadFile);

module.exports = router;