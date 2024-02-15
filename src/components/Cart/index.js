import {useState} from 'react'
import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import PaymentPopup from '../PaymentPopup'
import './index.css'

const Cart = () => {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    'Cash on Delivery',
  )
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const handleOpenPaymentPopup = () => {
    setShowPaymentPopup(true)
  }

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false)
  }

  const handleSelectPaymentMethod = event => {
    setSelectedPaymentMethod(event.target.value)
  }

  const handleConfirmOrder = () => {
    console.log('Order confirmed')
    setOrderConfirmed(true)
    handleClosePaymentPopup()
  }

  return (
    <CartContext.Consumer>
      {({cartList, removeAllCartItems}) => {
        const showEmptyView = cartList.length === 0

        const onClickRemoveAllBtn = () => {
          removeAllCartItems()
        }

        const handleCheckout = () => {
          handleOpenPaymentPopup()
        }

        return (
          <>
            <Header />
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                  <CartListView />
                  <CartSummary />
                  <button
                    type="button"
                    className="checkout-btn"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
            {showPaymentPopup && (
              <PaymentPopup
                onClose={handleClosePaymentPopup}
                onConfirmOrder={handleConfirmOrder}
                cartList={cartList}
                selectedPaymentMethod={selectedPaymentMethod}
                onSelectPaymentMethod={handleSelectPaymentMethod}
              />
            )}
            {orderConfirmed && (
              <div className="order-confirmation">
                Your order has been placed successfully!
              </div>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
