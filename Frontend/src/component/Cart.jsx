
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delCart } from '../redux/action';
import { NavLink } from 'react-router-dom';
import { incrementCounter, decrementCounter, writeCounter, updateCounter } from '../redux/action';

const Cart = () => {
    const state = useSelector((state) => state.handleCart);
    const stateCounter = useSelector((state) => state.handleCounter);

    let total = 0;

    const dispatch = useDispatch();

    const handleClose = (product) => {
        dispatch(delCart(product));
    }

    const handleCounter = (product, action) => {
        if (action === "MINUS") {
            dispatch(decrementCounter(product));
            product.count = product.count - 1;
            dispatch(updateCounter(product));

        } else if (action === "PLUS") {
            dispatch(incrementCounter(product));
            product.count = product.count + 1;
            dispatch(updateCounter(product));

        } else {
            dispatch(writeCounter(product));
        }
    }

    const cartItems = (cartItem) => {

        const found = stateCounter.find((x) => {
            return x.identification === cartItem.identification
        });

        const precioProducto = cartItem.price * found.count;
        total = total + (cartItem.price * found.count);

        const foundCount = found !== undefined ? found.count > cartItem.stock ? true : false : false;

        cartItem.count = found !== undefined ? found.count : 1;

        return (
            <div className="px-4 mb-4 bg-light rounded-3" key={cartItem.identification}>
                <div className="container py-4">
                    <button className="btn-close float-end" aria-label="Close" onClick={() => handleClose(cartItem)}></button>

                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={cartItem.thumbnail} alt={cartItem.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3 className="display-7">{cartItem.title}</h3>
                            <h3 className="display-9 fw-blod mb-4">$ {cartItem.price}</h3>

                            <div className="input-group">
                                <button className="btn btn-dark px-4" onClick={() => handleCounter(cartItem, "MINUS")}><i className="fa fa-minus" /></button>
                                <p className="lead ms-4 pt-2">{cartItem.count}</p>
                                <button className="btn btn-outline-dark px-4 ms-4" onClick={() => handleCounter(cartItem, "PLUS")}><i className="fa fa-plus" /></button>
                            </div>
                            <p>Disponibles {cartItem.stock}</p>

                            {
                                foundCount ? <div className="alert alert-danger" role="alert">
                                    Cantidad no disponible
                                </div> : null
                            }

                            <h3 className="display-9 fw-blod">Precio final: $ {precioProducto}</h3>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const cartEmtpy = () => {
        return (
            <div className="px-4 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <h3>El carrito esta vacio</h3>
                    </div>
                </div>
            </div>
        )
    }

    const buttonBuy = () => {
        const disabled = stateCounter.find((x) => {
            return x.count > x.stock
        });

        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <h3 className="display-9 fw-blod">Total compra: $ {total}</h3>
                    {
                        disabled !== undefined ? null : <NavLink to="/confirm" className="btn btn-outline-dark px-4 py-2 mx-auto">Confirmar compra</NavLink>
                    }

                </div>
            </div>
        )
    }

    return (
        <>

            <div>
                <div className="container py-5">
                    <div className="row py-5">
                        {state.length !== 0 && stateCounter.length > 0 ? state.map(cartItems) : cartEmtpy()}
                        {state.length !== 0 && buttonBuy()}
                    </div>
                </div>
            </div>

        </>
    )

}

export default Cart;
