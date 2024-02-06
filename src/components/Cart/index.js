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

  const handleOpenPaymentPopup = () => {
    setShowPaymentPopup(true)
  }

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false)
  }

  const handleSelectPaymentMethod = event => {
    setSelectedPaymentMethod(event.target.value)
  }

  return (
    <CartContext.Consumer>
      {({cartList, removeAllCartItems}) => {
        const showEmptyView = cartList.length === 0

        const onClickRemoveAllBtn = () => {
          removeAllCartItems()
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
                  {cartList.length > 0 && (
                    <button
                      type="button"
                      className="checkout-btn"
                      onClick={handleOpenPaymentPopup}
                    >
                      Checkout
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* Render PaymentPopup component conditionally */}
            {showPaymentPopup && (
              <PaymentPopup
                onClose={handleClosePaymentPopup}
                onConfirmOrder={() => {
                  // Simulate order confirmation by showing a console log
                  console.log('Order confirmed')
                  // You can add more logic here, such as sending order data to the server
                }}
                cartList={cartList}
                selectedPaymentMethod={selectedPaymentMethod}
                onSelectPaymentMethod={handleSelectPaymentMethod}
              />
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
