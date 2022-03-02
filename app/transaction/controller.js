const Transaction = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find();
      res.render('admin/transaction/view_transaction', {
        transaction,
        alert,
        title: 'Transaction',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      await Transaction.findOneAndUpdate(
        { _id: id },
        {
          status,
        }
      );
      req.flash('alertMessage', `berhasil melakukan aksi`);
      status === 'success'
        ? req.flash('alertStatus', 'primary')
        : req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },
};
