import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const PaymentPopup = ({
  onClose,
  onConfirmOrder,
  cartList,
  selectedPaymentMethod,
  onSelectPaymentMethod,
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const handleConfirmOrder = () => {
    console.log('Your order has been placed successfully')
    onConfirmOrder()
    setOrderConfirmed(true)
    onClose()
  }

  const calculateTotalItems = () =>
    cartList.reduce((total, item) => total + item.quantity, 0)

  const calculateTotalCost = () =>
    cartList.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Popup open onClose={onClose}>
      <div className="payment-popup">
        <h2>Select Payment Method</h2>
        <select value={selectedPaymentMethod} onChange={onSelectPaymentMethod}>
          <option value="Card" disabled>
            Card
          </option>
          <option value="Net Banking" disabled>
            Net Banking
          </option>
          <option value="UPI" disabled>
            UPI
          </option>
          <option value="Wallet" disabled>
            Wallet
          </option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
        <p>Total Items: {calculateTotalItems()}</p>
        <p>Total Cost: ${calculateTotalCost().toFixed(2)}</p>
        {orderConfirmed ? (
          <p>Your order has been placed successfully</p>
        ) : (
          <button
            type="button"
            onClick={handleConfirmOrder}
            disabled={selectedPaymentMethod !== 'Cash on Delivery'}
          >
            Confirm Order
          </button>
        )}
      </div>
    </Popup>
  )
}

export default PaymentPopup
