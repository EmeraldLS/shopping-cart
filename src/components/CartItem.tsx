import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"
type CartItemProps = {
    id: number,
    quantity: number,
}

export function CartItem({id, quantity}: CartItemProps) {
    const {removeItemFromCart} = useShoppingCart()
    const item = storeItems.find(i => i.id == id)
    if (item == null) return null
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imageURL} style={{height:"75px", width:"125px", objectFit: "cover"}}></img>
            <div className="me-auto">
            <div>
                {item.name} {quantity > 1 && <span style={{fontSize: ".75rem"}}>x{quantity}</span>}
            </div>
            <div className="text-muted" style={{fontSize: ".75rem"}}>
               {formatCurrency(item.price)}
            </div>
            </div>
            <div>
                {formatCurrency(item.price * quantity)}
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeItemFromCart(item.id)}>X</Button>
        </Stack>
    )
}