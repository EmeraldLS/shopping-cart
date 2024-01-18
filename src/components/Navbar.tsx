import {Button, Container, Nav, Navbar as NavbarBs} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/shoppingCartContext"

export function Navbar() {
    const {openCart, cartQuantity} = useShoppingCart()
    return(
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3 me-auto">
            <Container>
                <Nav>
                    <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
                </Nav>
                {cartQuantity > 0 && (
                <Button 
                onClick={openCart}
                style={{
                    width: "3rem", 
                    height: "3rem", 
                    position: "relative"
                    }} variant="outline-primary" className="rounded-circle">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-cart3" 
                    viewBox="0 0 16 16">
                        <path
                        fillRule="evenodd"
                        d="M.5 1a.5.5 0 0 1 .5.5v.5a2 2 0 0 0 2 2h1l.5  .5 1 1 .5.5h8a.5.5 0 0 1  .5.5v.5a2 2 0 0 1-2 2H4a2 2 0 0 1- 2-2V5a2 2 0 0 1 2-2h9a.5.5 0 0 1 . 5.5v.5h-9a.5.5 0 0 0-.5.5v.5a1 1 0 0 0 1 1h9a1 1 0  0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v.5a.5.5 0 0 0 .5.5h9v.5H4a.5.5 0 0 1-.5-.5V5a2 2 0 0 1 2-2h9a2 2 0 0  1 2 2v.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2.5A.5.5 0 0 1 .5 2v-.5z">
                        </path>
                        </svg>
                        
                            <div 
                            className="rounded-circle bg-danger d-flex justify-content-center align-items-center text-white" 
                            style={{
                                position: "absolute",
                                width: "1.5rem", 
                                height: "1.5rem", 
                                fontSize: "0.75rem",
                                top: "-0.5rem",
                                right: "-0.5rem"
                                }}
                            >{cartQuantity}
                        </div>
                </Button>)}
            </Container>
        </NavbarBs>
    )
}