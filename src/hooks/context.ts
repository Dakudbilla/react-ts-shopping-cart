import { useContext } from "react"
import { shoppingCartContext } from "../context/ShoppingCartContext"

export const useShoppingCart =()=>{
    return useContext(shoppingCartContext)
}