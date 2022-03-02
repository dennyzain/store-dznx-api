const Category = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const category = await Category.find();
      res.render('admin/category/view_category', {
        category,
        alert,
        title: 'Category',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create', { title: 'Category', name: req.session.user.name });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionCreate: async (req, res) => {
    try {
      req.flash('alertMessage', 'berhasil membuat kategori');
      req.flash('alertStatus', 'success');
      const { name } = req.body;
      const category = await Category({ name });
      category.save();
      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      res.render(`admin/category/edit`, {
        category,
        title: 'Category',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionEdit: async (req, res) => {
    try {
      req.flash('alertMessage', 'berhasil mengubah kategori');
      req.flash('alertStatus', 'primary');
      const { id } = req.params;
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: id }, { name });
      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionDelete: async (req, res) => {
    try {
      req.flash('alertMessage', 'berhasil menghapus kategori');
      req.flash('alertStatus', 'warning');
      const { id } = req.params;
      await Category.findOneAndDelete({ _id: id });
      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
};
