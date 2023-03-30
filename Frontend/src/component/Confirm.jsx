
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearItem } from '../redux/action';

const Confirm = () => {

    const dispatch = useDispatch();

    const [dataResponse, setDataResponse] = useState({});

    const state = useSelector((state) => state.handleCart);
    const stateCounter = useSelector((state) => state.handleCounter);

    let total = 0;

    const handleSubmit = () => {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const bank = document.getElementById("bank").value;

        if (name.length === 0) {
            alert("Llene todos los campos antes de enviar");
            return null;
        }
        if (phone.length === 0) {
            alert("Llene todos los campos antes de enviar");
            return null;
        }
        if (bank.length === 0) {
            alert("Llene todos los campos antes de enviar");
            return null;
        }

        const products = Object.assign(state, stateCounter);

        const resquest = {
            products: [...products],
            name: name,
            phone: phone,
            bank: bank,
            total: total
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resquest)
        };

        fetch('api/buy', requestOptions)
            .then(response => response.json())
            .then(data => {
                setDataResponse(data)
                dispatch(clearItem());
            });
    }

    const cartItems = (cartItem) => {
        const found = stateCounter.find((x) => {
            return x.identification === cartItem.identification
        });

        const precioProducto = cartItem.price * found.count;
        total = total + (cartItem.price * found.count);

        state.count = found.count;

        return (
            <tr>
                <td>{cartItem.title}</td>
                <td>{found.count}</td>
                <td>$ {precioProducto}</td>
            </tr>
        )
    }

    const cartEmtpy = () => {
        return (
            <div className="px-4 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <h3>El carrito esta vacio, no se puede confirmar la compra</h3>
                    </div>
                </div>
            </div>
        )
    }

    const buttonBuy = () => {
        return (
            <div className="mt-4">
                <div className="row justify-content-center">
                    <hr />
                    <div className="input-group mb-4">
                        <input className="form-control" id="name" type="text" placeholder="Nombre" />
                        <input className="form-control ms-2" id="phone" type="number" placeholder="Telefono" />
                        <input className="form-control ms-2" id="bank" type="text" placeholder="Banco" />
                    </div>
                    <button className="btn btn-outline-dark px-4 py-2 mx-auto" onClick={() => handleSubmit()}>Confirmar y finalizar compra</button>
                </div>
            </div>
        )
    }

    return (
        <>
            {dataResponse.message === undefined ? <div>
                <div className="container py-5">
                    <div className="row">

                        {state.length !== 0 && stateCounter.length > 0 ? <table class="table table-bordered ">
                            <thead>
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Precio final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.map(cartItems)}
                                <tr>
                                    <td colspan="2"><b>Total compra</b></td>
                                    <td> $ {total}</td>
                                </tr>
                            </tbody>
                        </table> : cartEmtpy()}

                        {state.length !== 0 && buttonBuy()}
                    </div>
                </div>
            </div> : <div className={`container mt-5 alert ${dataResponse.type}`} role="alert">
                {dataResponse.message}
            </div>}

        </>
    )
}

export default Confirm;
