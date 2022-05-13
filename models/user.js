const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const productIndex = this.cart.items.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );
  let cartItems = [...this.cart.items];
  let newQuantity = 1;
  if (productIndex >= 0) {
    newQuantity = this.cart.items[productIndex].quantity + 1;
    cartItems[productIndex].quantity = newQuantity;
  } else {
    cartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: cartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (prodId) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== prodId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
