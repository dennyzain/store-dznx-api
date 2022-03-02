const Voucher = require('../voucher/model');
const Transaction = require('../transaction/model');
const User = require('../users/model');
const Category = require('../category/model');

module.exports = {
  index: async (req, res) => {
    try {
      const voucher = await Voucher.find();
      const transaction = await Transaction.find();
      const user = await User.find();
      const category = await Category.find();

      res.render('admin/dashboard/view_dashboard', {
        title: 'Dashboard',
        name: req.session.user.name,
        count: {
          voucher,
          transaction,
          user,
          category,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
