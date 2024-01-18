import { ReactNode, createContext, useContext } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";



type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeItemFromCart: (id: number) => void
    openCart: () => void
    closeCart: () => void
    cartItems: CartItem[]
    cartQuantity: number
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext) 

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}



export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useLocalStorage("toggler",false)
    const [cartItems, setCartItems] =  useLocalStorage<CartItem[]>("shopping-cart",[])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const getItemQuantity = (id: number): number => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    
    const increaseCartQuantity = (id: number)  => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, {id, quantity: 1}]
            }else{
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number)  => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id != id)
            }else{
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    const removeItemFromCart = (id: number) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id != id)
        })
    }

    return <ShoppingCartContext.Provider value=
    {{
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeItemFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
    }}>
        {children}
        {
            isOpen ?  <ShoppingCart isOpen={isOpen } /> : ""
        }
       
    </ShoppingCartContext.Provider>
}