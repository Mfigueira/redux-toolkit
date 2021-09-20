import { showNotification } from "./ui-slice";
import { replaceCart } from "./cart-slice";

export const fetchCartData = () => async (dispatch) => {
  try {
    const response = await fetch("FIREBASE_URL.json");

    if (!response.ok) {
      throw new Error("Fetching cart data failed");
    }

    const cartData = await response.json();
    dispatch(
      replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      })
    );
  } catch (error) {
    console.error(error);
    dispatch(
      showNotification({
        status: "error",
        title: "Error",
        message: "Fetching cart data failed.",
      })
    );
  }
};

export const sendCartData = (cart) => async (dispatch, getState) => {
  // Just to test the getState() method
  // console.log("Cart slice of state: ", getState().cart);
  // console.log("UI slice of state: ", getState().ui);

  try {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const response = await fetch("FIREBASE_URL.json", {
      method: "PUT",
      body: JSON.stringify({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
      }),
    });

    if (!response.ok) {
      throw new Error("Sending cart data failed");
    }

    dispatch(
      showNotification({
        status: "success",
        title: "Success",
        message: "Cart data sent!",
      })
    );
  } catch (error) {
    console.error(error);
    dispatch(
      showNotification({
        status: "error",
        title: "Error",
        message: "Sending cart data failed.",
      })
    );
  }
};
