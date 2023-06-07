const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT; 

async function auth(_user, _pass){

        
    const token = await generateToken(_user, _pass);

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Token verificado:', decoded);
        return token;
    } catch (error) {
        console.error('Error al verificar el token:', error);
    }
}


async function generateToken(_user, _pass){

    
    const payload = { username: _user, password: _pass };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token; 
}

// Función de middleware para verificar y decodificar el token JWT
async function verifyToken(req, res, next) {

    try{
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token de los encabezados
    
        if (!token) {
            return res.status(403).json({ error: 'Token no proporcionado' });
        }
  
        await jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    
        req.user = decoded; // Agregar el objeto decodificado al objeto de solicitud
        next(); // Continuar con la siguiente función de middleware
        });


    }catch (_error){
        return res.status(401).json({ error: 'Error al obtener encabezado' });
    }
    
  }

  module.exports = {
    auth,
    generateToken,
    verifyToken
  }