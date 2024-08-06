import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

const Checkout = () => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreateOrder = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/create`,
        {},
        { withCredentials: true }
      )
      if (data.data && data.data.razorpayOrderId) {
        openRazorpayCheckout(data.data)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const openRazorpayCheckout = (orderData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Medishop',
      description: 'Payment for order.',
      order_id: orderData.razorpayOrderId,
      handler: function (response) {
        handlePaymentSuccess(response, orderData.order._id)
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Customer Address',
      },
      theme: {
        color: '#9FE870',
      },
    }

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options)
      rzp.open()
    } else {
      console.error('Razorpay SDK not loaded.')
    }
  }

  const handlePaymentSuccess = async (response, orderId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/complete`,
        {
          orderId,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        },
        {
          withCredentials: true,
        }
      )

      // Invalidate the cart query
      queryClient.invalidateQueries(['cart'])
      navigate('/success')
    } catch (error) {
      alert('Error Completing order')
    }
  }

  return (
    <button
      className="px-2 py-2 text-sm font-semibold bg-blue-400 rounded-lg text-white"
      onClick={handleCreateOrder}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Pay with Razorpay'}
    </button>
  )
}

export default Checkout
