import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/ui-slice";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.cart);

  const toggleCartButton = () => {
    dispatch(toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartButton}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
