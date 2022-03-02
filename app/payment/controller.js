const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate('banks');
      console.log(payment);
      res.render('admin/payment/view_payment', {
        payment,
        alert,
        title: 'Payment',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();
      res.render('admin/payment/create', { bank, title: 'Payment', name: req.session.user.name });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;
      await Payment.create({ type, banks });
      req.flash('alertMessage', 'berhasil membuat payment');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id }).populate('banks');
      res.render(`admin/payment/edit`, { payment, title: 'Payment', name: req.session.user.name });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;
      req.flash('alertStatus', 'primary');
      req.flash('alertMessage', `berhasil mengubah payment ${type}`);
      await Payment.findOneAndUpdate({ _id: id }, { type, banks });
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionDelete: async (req, res) => {
    try {
      req.flash('alertMessage', 'berhasil menghapus payment');
      req.flash('alertStatus', 'warning');
      const { id } = req.params;
      await Payment.findOneAndDelete({ _id: id });
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id });
      let status = payment.status === 'Y' ? 'N' : 'Y';
      await Payment.findOneAndUpdate({ _id: id }, { status });
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
};
