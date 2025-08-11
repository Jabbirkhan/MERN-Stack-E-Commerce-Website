import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('');

    const addToCart = async (itemId, sizes) => {

        if (!sizes) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][sizes]) {
                cartData[itemId][sizes] += 1;
            }
            else {
                cartData[itemId][sizes] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][sizes] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId, sizes}, {headers:{token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0 ;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    totalCount += cartItems[items][item];
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, sizes, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][sizes] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, sizes, quantity}, {headers:{token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}});
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getProductsData();
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    },[])

    // It checks:
    // If there’s no token in the context's state
    // But a token exists in localStorage
    // If so:
    // It sets the token state in context (setToken)
    // Why is this necessary?
    // Because when your React app reloads (like on page refresh), your in-memory React state (useState) is wiped clean, including your token in context.
    // But the token still persists in localStorage across refreshes.
    // So this useEffect ensures:
    // If React loses the token state
    // But it’s still in localStorage
    // we restore it into React’s context state

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems,setCartItems, addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount, navigate, backendUrl,
        token,setToken 
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider