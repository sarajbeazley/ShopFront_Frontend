import classes from "./CartItem.module.css";
import { ShoppingBag } from "../../../pages/HomePage";
import { useContext } from "react";
import CloseIcon from "../../svgs/CloseIcon";
import { useTranslation } from "react-i18next";

const CartItem = () => {
  const { t } = useTranslation();

  const [myShoppingBag, setMyShoppingBag] = useContext(ShoppingBag);

  const renderStars = (cartItem) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${classes.ProductRatingStar} ${
            i <= cartItem.rating ? classes.ProductRatingStarFilled : ""
          }`}
        >
          {i <= cartItem.rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  const handleMinusQuantity = (index) => {
    const bag = [...myShoppingBag];
    bag[index].quantity -= 1;
    if (bag[index].quantity === 0) {
      bag.splice(index, 1);
    }
    setMyShoppingBag(bag);
  };
  const removeItem = (index) => {
    const bag = [...myShoppingBag];

    bag.splice(index, 1);

    setMyShoppingBag(bag);
  };
  const handlePlusQuantity = (index) => {
    const bag = [...myShoppingBag];
    bag[index].quantity += 1;
    setMyShoppingBag(bag);
  };

  return (
    <div>
      {myShoppingBag.length > 0 &&
        myShoppingBag.map((cartItem, index) => {
          return (
            <section className={classes.itemContainer} key={index}>
              <div className={classes.imgContainer}>
                <img src={cartItem.imageUrl} alt={cartItem.name} />
              </div>
              <div className={classes.itemsInfo}>
                <div className={classes.topItemGrid}>
                  <p>{cartItem.name}</p>
                  <button
                    className={classes.closeLogin}
                    onClick={() => removeItem(index)}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className={classes.productInfo}>
                  <span>
                    {t("cart.category")}: {cartItem.category}
                  </span>
                  <span>
                    {t("cart.rating")}: {renderStars(cartItem)}
                  </span>
                </div>
                <div className={classes.amount}>
                  <div className={classes.quantity}>
                    <div
                      className={classes.quantityButton}
                      onClick={() => handleMinusQuantity(index)}
                    >
                      -
                    </div>
                    <span className={classes.itemQuantity}>
                      {cartItem.quantity}
                    </span>
                    <div
                      className={classes.quantityButton}
                      onClick={() => handlePlusQuantity(index)}
                    >
                      +
                    </div>
                  </div>
                  <span className={classes.price}>
                  €{cartItem.price * cartItem.quantity}
                  </span>
                </div>
              </div>
            </section>
          );
        })}
      {myShoppingBag.length === 0 && (
        <div>
          <p>{t("cart.empty")}</p>
        </div>
      )}
    </div>
  );
};

export default CartItem;
