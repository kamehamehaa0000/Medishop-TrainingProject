import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchProducts = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/product/products`
  )
  return data
}
export const useProduct = () => {
  return useQuery(['products'], fetchProducts)
}
