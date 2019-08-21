"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: DataTypes.STRING,
      price: { type: DataTypes.DOUBLE, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      userId: DataTypes.INTEGER
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User);
    Product.belongsToMany(models.Cart, {
      through: "CartItems",
      foreignKey: "productId"
    });
  };
  return Product;
};
