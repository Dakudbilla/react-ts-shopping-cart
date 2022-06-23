import { Offcanvas, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useShoppingCart } from "../hooks/context"
import { formatCurrency } from "../utilities/formatCurrency"
import CartItem from "./CartItem"
import storeItems from '../data/items.json'
type ShoppingCartProps = {
    isOpen: boolean
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
    const { closeCart, cartItems } = useShoppingCart()
    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>

        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.length > 0 ?
                    cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    )) :
                    <div>
                        No Items In Cart, <span onClick={() => closeCart()}><Link to="/store"> Continue Shopping</Link></span>
                    </div>
                }

                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(item => item.id === cartItem.id)

                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0))}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}

export default ShoppingCart