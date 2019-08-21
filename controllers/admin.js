const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;

  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const product = new Product(prodId, title, imageUrl, description, price);
  product.save();

  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Product List",
      path: "/admin/products"
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  if (!prodId) {
    return res.redirect("/");
  }

  Product.deleteById(prodId, products => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Product List",
      path: "/admin/products"
    });
  });
};
