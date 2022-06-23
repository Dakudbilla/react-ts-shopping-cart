import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"

type shoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartmQuantity: (id: number) => void
    decreaseCartmQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    openCart: () => void
    closeCart: () => void
}

type CartItem = {
    id: number,
    quantity: number
}
export const shoppingCartContext = createContext({} as ShoppingCartContext)

export const ShoppingCartProvider = ({ children }: shoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartmQuantity = (id: number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartmQuantity = (id: number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        return setCartItems(currentItems => currentItems.filter(item => item.id !== id))
    }
    const openCart = () => setIsOpen(true)

    const closeCart = () => setIsOpen(false)

    const numItemsInCart = () => {
        let sum = 0
        cartItems.map((item) => {
            sum += item.quantity
        })

        return sum
    }
    return (<shoppingCartContext.Provider value={{ getItemQuantity, increaseCartmQuantity, decreaseCartmQuantity, removeFromCart, cartQuantity: numItemsInCart(), cartItems, openCart, closeCart }}>
        {children}
        <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>)
}



