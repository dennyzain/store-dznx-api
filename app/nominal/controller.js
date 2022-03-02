const Nominal = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const nominal = await Nominal.find();
      res.render('admin/nominal/view_nominal', {
        nominal,
        alert,
        title: 'Nominal',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/nominal/create', { title: 'Nominal', name: req.session.user.name });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionCreate: async (req, res) => {
    try {
      req.flash('alertMessage', 'berhasil membuat nominal');
      req.flash('alertStatus', 'success');
      const { coinName, coinQuantity, price } = req.body;
      const nominal = await Nominal({ coinName, coinQuantity, price });
      nominal.save();
      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });
      res.render(`admin/nominal/edit`, { nominal, title: 'Nominal', name: req.session.user.name });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      const { id } = req.params;
      req.flash('alertStatus', 'primary');
      req.flash('alertMessage', `berhasil mengubah nominal ${coinName}`);
      await Nominal.findOneAndUpdate({ _id: id }, { coinName, coinQuantity, price });
      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionDelete: async (req, res) => {
    try {
      req.flash('alertMessage', 'berhasil menghapus nominal');
      req.flash('alertStatus', 'warning');
      const { id } = req.params;
      await Nominal.findOneAndDelete({ _id: id });
      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
};
