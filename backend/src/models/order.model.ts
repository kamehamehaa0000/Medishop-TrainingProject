import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IOrderItem {
  product: Types.ObjectId
  quantity: number
}

export interface IOrder extends Document {
  user: Types.ObjectId
  items: IOrderItem[]
  totalPrice: number
  status: string
  paymentIntentId: string
  deliveryAddress: string
  pincode: string
  city: string
  state: string
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
})

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' },
    paymentIntentId: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
)

const Order = mongoose.model<IOrder>('Order', orderSchema)

export { Order }
