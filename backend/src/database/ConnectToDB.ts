import mongoose from 'mongoose'
import '../config/env'
const uri: string | undefined = process.env.MONGO_URI
export default async function ConnectToDatabase(): Promise<void> {
  try {
    if (uri) {
      await mongoose.connect(uri).catch((err) => {
        throw new Error((err as Error).message)
      })
      console.log(
        mongoose.connection.readyState
          ? 'Successfully Connected To Database !!'
          : 'NOT CONNECTED TO DATABASE'
      )
    }
  } catch (error) {
    console.log((error as Error).message)
  }
}
