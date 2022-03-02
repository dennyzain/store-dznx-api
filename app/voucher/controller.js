const Voucher = require('./model');
const Nominal = require('./../nominal/model');
const Category = require('./../category/model');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const voucher = await Voucher.find().populate('category').populate('nominals');
      res.render('admin/voucher/view_voucher', {
        voucher,
        alert,
        title: 'Voucher',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const nominal = await Nominal.find();
      const category = await Category.find();
      res.render('admin/voucher/create', {
        category,
        nominal,
        title: 'Voucher',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { category, nominals, name } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let fileName = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const voucher = new Voucher({ name, category, nominals, thumbnail: fileName });
            await voucher.save();
            req.flash('alertMessage', 'berhasil membuat voucher');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
          }
        });
      } else {
        const voucher = new Voucher({ name, category, nominals });
        await voucher.save();
        req.flash('alertMessage', 'berhasil membuat voucher');
        req.flash('alertStatus', 'success');
        res.redirect('/voucher');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id }).populate('category').populate('nominals');
      res.render(`admin/voucher/edit`, { voucher, title: 'Voucher', name: req.session.user.name });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { category, nominals, name } = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let fileName = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const voucherThumb = await Voucher.findOne({ _id: id });
            let currThumb = `${config.rootPath}/public/uploads/${voucherThumb.thumbnail}`;
            if (fs.existsSync(currThumb)) {
              fs.unlinkSync(currThumb);
            }
            await Voucher.findOneAndUpdate(
              { _id: id },
              { name, category, nominals, thumbnail: fileName }
            );
            req.flash('alertMessage', 'berhasil mengubah voucher');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
          }
        });
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });
      let currThumb = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      if (fs.existsSync(currThumb)) {
        fs.unlinkSync(currThumb);
      }
      await Voucher.findOneAndDelete({ _id: id });
      req.flash('alertMessage', 'berhasil menghapus voucher');
      req.flash('alertStatus', 'warning');
      res.redirect('/voucher');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });
      let status = voucher.status === 'Y' ? 'N' : 'Y';
      await Voucher.findOneAndUpdate({ _id: id }, { status });
      req.flash('alertMessage', 'berhasil menghapus voucher');
      req.flash('alertStatus', 'warning');
      res.redirect('/voucher');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
};
