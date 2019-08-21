"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: DataTypes.INTEGER
    },
    {}
  );
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsToMany(models.Product, {
      through: "CartItems",
      foreignKey: "cartId"
    });
  };
  return Cart;
};
