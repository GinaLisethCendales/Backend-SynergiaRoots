function validarRol(req, res, next) {
    // Aquí realizas la lógica de validación del rol del usuario
    const { role } = req.body; // Suponiendo que el rol se envía en el cuerpo de la solicitud
  
    // Ejemplo de validación
    if (role === 'admin') {
      // Si el rol es 'admin', pasa al siguiente middleware o al controlador principal
      next();
    } else {
      // Si el rol no es válido, envía una respuesta de error
      res.status(403).json({ mensaje: 'Acceso denegado. Rol no válido.' });
    }
  }
  

  module.exports = {validarRol}
  