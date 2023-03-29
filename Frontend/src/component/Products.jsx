
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);

    const [numFilter, setnumFilter] = useState("");

    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);

            //https://fakestoreapi.com/products
            const response = await fetch("/api/products");

            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }

        getProducts();
    }, []);


    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        );
    }


    const filterProduct = () => {
        const title = document.getElementById("title").value.toLowerCase();
        const min = document.getElementById("precioMenor").value;
        const max = document.getElementById("precioMayor").value;

        const updateList = data.filter((x) =>
            (title.length === 0) ? true : x.title.toLowerCase().includes(title)
        ).filter((x) =>
            (min.length === 0) ? true : x.price >= min
        ).filter((x) =>
            (max.length === 0) ? true : x.price <= max
        );

        setFilter(updateList);
        setnumFilter("(*)");
    };

    const cleanFilterProduct = () => {
        setFilter(data);
        setnumFilter("");
    };

    const ShowProducts = () => {
        return (
            <>
                <div className="col-12 mb-4">
                    <form className="row p-4 row-cols-sm-auto border text-bg-secondary align-items-center rounded-3 justify-content-center">
                        <div className="col-1">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Filtrar por nombre" id="title" />
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Filtrar precio menor" id="precioMenor"/>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Filtrar precio mayor" id="precioMayor"/>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="input-group">
                                <button className="btn btn-dark me-2" onClick={() => filterProduct()}>Filtar</button>
                                <button className="btn btn-dark me-2" onClick={() => cleanFilterProduct()}>Borrar filtros {numFilter}</button>
                            </div>
                        </div>
                    </form>
                </div>

                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center p-4" key={product.identification}>
                                    <img src={product.images[0]} className="card-img-top" alt={product.title} height="300px" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
                                        <p className="card-text">{product.price}</p>
                                        <NavLink to={`/product/${product.identification}`} className="btn btn-primary">Ver detalle</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 mb-4">
                        <h1 className="display-6 fw-bolder text-center">Productos</h1>
                        <hr />
                    </div>

                    <div className="row justify-content-center">
                        {loading ? <Loading /> : <ShowProducts />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
