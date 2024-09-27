import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    const totalAmount = cart.reduce((accumulator, item) => {
      let cost = parseInt(item.cost.replace(/[^0-9]/g, ""), 10);
      return accumulator + cost * parseInt(item.quantity);
    }, 0);
    return totalAmount;
  };
  const handleContinueShopping = (e) => {
    alert("Functionality to be added for future reference");
  };
  const handleIncrement = (item) => {
    const newItem = {
      ...item,
      quantity: item.quantity + 1,
    };
    dispatch(updateQuantity(newItem));
  };
  const handleDecrement = (item) => {
    const newItem = {
      ...item,
      quantity: item.quantity - 1,
    };
    if (newItem.quantity > 0) {
      dispatch(updateQuantity(newItem));
    } else {
      dispatch(removeItem(newItem));
    }
  };
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };
  const calculateTotalCost = (item) => {
    const product = cart.find((i) => i.name === item.name);
    let cost = parseInt(product.cost.replace(/[^0-9]/g, ""), 10);
    return cost * parseInt(product.quantity);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
