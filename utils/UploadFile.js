const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Define la carpeta de destino para guardar los archivos subidos
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Genera un nombre de archivo único para evitar colisiones
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
  });



// Controlador para la carga de archivos
const uploadFile = (req, res) => {
    // Aquí puedes acceder al archivo subido utilizando req.file
    if (!req.file) {
        // Si no se proporcionó ningún archivo, retorna un error
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
    }

    // Aquí puedes realizar las acciones necesarias con el archivo subido
    // Por ejemplo, guardar información en la base de datos, procesar el archivo, etc.

    res.status(200).json({ message: 'Archivo cargado exitosamente' });
};


const fileFilter = (req, file, cb) => {
    // Verifica si el archivo es una foto según su tipo MIME
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('El archivo debe ser una foto válida'));
    }
  };
  
const upload = multer({ storage, fileFilter });

module.exports = {
  uploadFile,
  upload
};