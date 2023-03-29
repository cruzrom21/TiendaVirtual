
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, delCart, incrementCounter, decrementCounter, writeCounter } from '../redux/action';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NavLink, useParams } from "react-router-dom";


const Product = () => {

    const state = useSelector((state) => state.handleCounter);

    const { id } = useParams();
    const [product, setDataProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [add, setAdd] = useState(false);

    const dispatch = useDispatch();

    const found = state.find((x) => {
        return x.identification === product.identification
    });


    const countInit = found !== undefined ? found.count : 0;
    const stockInit = product.stock !== null ? product.stock : -1;
    const foundCount = countInit > stockInit ? true : false;

    const [cartBtn, setCartBtn] = useState(found !== undefined ? "Remover del carrito" : "Agregar al carrito");


    const handleCart = (product) => {
        if (cartBtn === "Agregar al carrito") {
            setAdd(true)
            product.count = found === undefined ? 1 : found.count;
            dispatch(addCart(product));
            setCartBtn("Remover del carrito");
        } else {
            setAdd(false)
            dispatch(delCart(product));
            setCartBtn("Agregar al carrito");
        }
    }


    function handleChange(event) {
        product.increment = event.target.value;
        handleCounter(product, "WRITE");
    }

    const handleCounter = (product, action) => {
        if (action === "MINUS") {
            dispatch(decrementCounter(product));
        } else if (action === "PLUS") {
            dispatch(incrementCounter(product));
        } else {
            dispatch(writeCounter(product));
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);

            const response = await fetch(`/api/products/${id}`);
            setDataProduct(await response.clone().json());

            setLoading(false);
        }

        getProduct();
    }, []);



    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={450} />
                </div>

                <div className="col-md-6" style={{ lineHeight: 2 }}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                </div>
            </>
        );
    }



    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={product.thumbnail} alt={product.title} height="400px" width="400px" />
                </div>

                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>

                    <h1 className="display-5">{product.title}</h1>

                    <p className="lead fw-bolder">Rating {product.rating} <i className="fa fa-star"></i></p>

                    <h3 className="display-6 fw-blod my-4">
                        $ {found !== undefined ? found.count !== 0 ? product.price * found.count : product.price : product.price}
                    </h3>

                    <p className="lead">{product.description}</p>

                    <div className="input-group">
                        <p className="lead fw-bolder">Stock: </p><p className="lead ms-2">{product.stock != null ? product.stock : 0}</p>
                    </div>

                    <div className="input-group mb-2">
                        <button className="btn btn-dark px-4 py-2" onClick={() => handleCounter(product, "MINUS")}><i className="fa fa-minus" /></button>
                        <input className="form-control ms-2" type="number" placeholder="Cantidad" value={found === undefined ? 1 : found.count} onChange={handleChange} autoFocus />
                        <button className="btn btn-outline-dark px-4 py-2 ms-2" onClick={() => handleCounter(product, "PLUS")}><i className="fa fa-plus" /></button>
                    </div>

                    {
                        foundCount ? <div className="alert alert-danger" role="alert">
                            Cantidad no disponible
                        </div> : null
                    }

                    <button className="btn btn-outline-dark px-4 py-2 mt-2" disabled={foundCount ? "disabled" : null} onClick={() => handleCart(product)}>{cartBtn}</button>
                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2 mt-2">Ir al carrito</NavLink>

                    {
                        add ? <div className="alert alert-success mt-2" role="alert">
                            Se agrego el producto al carrito
                        </div> : null
                    }
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row py-5">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    );
}

export default Product;
