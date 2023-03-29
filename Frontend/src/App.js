import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Products from "./component/Products";
import Product from "./component/Product";
import Cart from "./component/Cart";
import Confirm from "./component/Confirm";
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { initCart, initCartCounter } from './redux/action';
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("api/cart/init");
      dispatch(initCart(await response.clone().json()));
      dispatch(initCartCounter(await response.clone().json()));
    }

    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/confirm' element={<Confirm />} />
      </Routes>

    </>
  );
}

export default App;
