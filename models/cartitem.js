"use strict";
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      cartID: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {}
  );
  CartItem.associate = function(models) {
    // associations can be defined here
    CartItem.belongsTo(models.Carts, { foreignKey: "cartId" });
    CartItem.belongsTo(models.Product, { foreignKey: "productId" });
  };
  return CartItem;
};
