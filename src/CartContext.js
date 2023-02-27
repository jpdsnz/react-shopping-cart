import { createContext, useState } from "react";
import { productsArray, getProductData} from "./productsStore";

const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () =>  {},
    removeOneToCart: () =>  {},
    deleteFromCart: () =>  {},
    getTotalCost: () =>  {},
})

export function CartProvider({children}){
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id){
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        
        if(quantity === undefined){
            return 0;
        }

        return quantity;
    }

    function addOnetoCart(id){
        const quantity = getProductQuantity(id);

        if(quantity === 0){
            setCartProducts(
                [
                    ...cartProducts, //take all objects already in cart and put in front of this array, and add another 
                    {
                        id:id,
                        quantity: 1
                    }
                ]
            )
        } else{ //product is in cart
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                               //If condition
                    ? { ...product, quantity: product.quantity + 1} //If Statement is true
                    : product                                               //If Statement is false
                )
            )
        }
    }

    function removeOneFromCart(id){
        const quantity = getProductQuantity(id);

        if(quantity == 1){
            deleteFromCart(id);
        } else{
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                               //If condition
                    ? { ...product, quantity: product.quantity - 1} //If Statement is true
                    : product                                               //If Statement is false
                )
            )
        }
    }

    function deleteFromCart(id){
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id !== id;
            })
        )
    }

    function getTotalCost(){
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        });
        return totalCost;
    }

    const contextValue = {
        items: [],
        getProductQuantity,
        addOneToCart: () =>  {},
        removeOneToCart: () =>  {},
        deleteFromCart: () =>  {},
        getTotalCost: () =>  {},
    }

    return (
        <CartProvider value={contextValue}>
            {children}
        </CartProvider>
    )
}

export default CartProvider