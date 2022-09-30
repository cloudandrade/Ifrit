const jwt = require('jsonwebtoken');
const { PERFIL } = require('../utils/constantHelper');

const checkAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: 401,
      data: {
        message: 'Unauthorized',
      },
    });
  }
  // eslint-disable-next-line no-unused-vars
  const [bearer, token] = authorization.split(' ');
  try {
    const decodeToken = await jwt.decode(token);
    console.log('token decodificado');
    console.log(decodeToken);
    let verification = null;
    if (decodeToken.GM === false) {
      verification = await jwt.verify(token, process.env.JWT_SECRET);
    } else {
      verification = await jwt.verify(
        token,
        process.env.JWT_SECRET_ADMIN
      );
    }

    req.key = verification.key;
  } catch (err) {
    return res.status(401).json({
      error: 401,
      data: {
        message: 'Unauthorized',
      },
    });
  }

  return next();
};

const checkAdminAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: 401,
      data: {
        message: 'Unauthorized',
      },
    });
  }
  // eslint-disable-next-line no-unused-vars
  const [bearer, token] = authorization.split(' ');
  try {
    const verification = await jwt.verify(
      token,
      process.env.JWT_SECRET_ADMIN
    );
    req.key = verification.key;
  } catch (err) {
    return res.status(401).json({
      error: 401,
      data: {
        message: 'Unauthorized',
      },
    });
  }

  return next();
};

const generateToken = async (player) => {
  let token = null;
  if (player.GM === false) {
    token = await jwt.sign(
      { id: player._id, perfil: player.GM },
      process.env.JWT_SECRET,
      {
        expiresIn: 172800, // expires in 48 hours
      }
    );
  } else {
    token = await jwt.sign(
      { id: player._id, perfil: player.GM },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: 172800, // expires in 48 hours
      }
    );
  }

  return token;
};

module.exports = {
  checkAuthorization,
  generateToken,
  checkAdminAuthorization,
};