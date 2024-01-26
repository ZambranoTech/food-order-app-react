import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatter";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const openModal = userProgressCtx.progress === "cart";

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal className="cart" open={openModal} onClose={openModal ? handleCloseCart : null}>
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to checkout</Button>}
      </p>
    </Modal>
  );
}
