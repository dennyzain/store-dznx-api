const Users = require('./model');
const bcrypt = require('bcrypt');

module.exports = {
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === undefined || req.session.user === null) {
        res.render('admin/users/view_signin', { alert, title: 'Sign In | store dznx' });
      } else {
        res.redirect('/dashboard');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) {
        if (user.status === 'Y') {
          const check = await bcrypt.compare(password, user.password);
          if (check) {
            req.session.user = {
              id: user._id,
              email: user.email,
              status: user.status,
              name: user.name,
            };
            res.redirect('/dashboard');
          } else {
            req.flash('alertMessage', `password yang dimasukkan salah mohon dicek kembali`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
          }
        } else {
          req.flash('alertMessage', `akun yang dimasukkan tidak aktif`);
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', `akun yang dimasukkan tidak tersedia `);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  actionSingOut: async (req, res) => {
    try {
      req.session.user = null;
      req.flash('alertMessage', `akun berhasil logout`);
      req.flash('alertStatus', 'success');
      res.redirect('/');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
};
