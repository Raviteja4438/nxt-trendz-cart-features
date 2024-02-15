import './index.css'

const PaymentPopup = ({
  onClose,
  onConfirmOrder,
  cartList,
  selectedPaymentMethod,
  onSelectPaymentMethod,
}) => {
  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const handleConfirmOrder = () => {
    console.log('Order confirmed')
    onClose()
    onConfirmOrder()
  }

  return (
    <div className="payment-popup">
      <div className="payment-popup-content">
        <button type="button" className="close" onClick={onClose}>
          &times;
        </button>
        <h2>Select Payment Method</h2>
        <select
          value={selectedPaymentMethod}
          onChange={onSelectPaymentMethod}
          aria-label="Select Payment Method"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option disabled>Card</option>
          <option disabled>Net Banking</option>
          <option disabled>UPI</option>
          <option disabled>Wallet</option>
        </select>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {cartList.length}</p>
          <p>Total Price: ${totalPrice}</p>
        </div>
        <button
          type="button"
          className="confirm-order-btn"
          onClick={handleConfirmOrder}
          disabled={selectedPaymentMethod !== 'Cash on Delivery'}
          aria-label="Confirm Order"
        >
          Confirm Order
        </button>
      </div>
    </div>
  )
}

export default PaymentPopup
