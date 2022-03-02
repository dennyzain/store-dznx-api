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
};
