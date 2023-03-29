import React from "react";
import Products from "./Products";

const Home = () => {
    return (
        <div className="hero">
            <div className="card text-white bg-dark" >
                <div className="card-body d-flex flex-column justify-content-center mb-5 mt-5">
                    <div className="container">
                        <h5 className="card-title ">Bienvenido a la tienda virtual</h5>
                        <p className="card-text">Prueba tecnica</p>
                    </div>
                </div>
            </div>

            <Products />
        </div>

    );
}

export default Home;
