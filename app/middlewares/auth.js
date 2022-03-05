const Player = require('../players/model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  isLoginAdmin: async (req, res, next) => {
    if (req.session.user === undefined || req.session.user === null) {
      req.flash('alertMessage', `sesi anda sudah habis, mohon login kembali`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    } else {
      next();
    }
  },
  isLoginPlayer: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : null;

      const data = jwt.verify(token, config.jwtKey);

      const player = await Player.findOne({ _id: data.player.id });

      if (!player) {
        throw new Error();
      }

      req.player = player;
      req.token = token;
      next();
    } catch (err) {
      res.status(401).json({
        error: 'Not authorized to access this resource',
      });
    }
  },
};
