const { findOneAndUpdate } = require('./model');
const Bank = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const bank = await Bank.find();
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/bank/view_bank', {
        bank,
        alert,
        title: 'Bank',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/bank/create', { title: 'Bank', name: req.session.user.name });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, bankName, accountNumber } = req.body;
      const bank = await Bank.create({ name, bankName, accountNumber });
      bank.save();
      req.flash('alertMessage', 'berhasil membuat data bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      res.render(`admin/bank/edit`, { bank, title: 'Bank', name: req.session.user.name });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, accountNumber } = req.body;
      await Bank.findOneAndUpdate({ _id: id }, { name, bankName, accountNumber });
      req.flash('alertMessage', 'berhasil mengubah data bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.findOneAndDelete({ _id: id });
      req.flash('alertMessage', 'berhasil menghapus data bank');
      req.flash('alertStatus', 'warning');
      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
};
