import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "#422458",
        zIndex: 1000,
        position: "fixed",
        top: 0,
        width: "100%",
      }}
    >
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 text-white px-2" to="/">
          Ecommerce PI
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/">
                Início
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/product">
                Produtos
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link text-white" to="/about">
                Sobre
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/contact">
                Contato
              </NavLink>
            </li> */}
          </ul>

          <div className="text-center m-2 d-flex align-items-center justify-content-center">
            {token && user && (
              <p className="text-white m-0">Bem-vindo, {user.name}</p>
            )}
          </div>

          <div className="buttons text-center">
            {token ? (
              <NavLink
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
                className="btn btn-outline-light m-2"
              >
                <i className="fa fa-sign-out-alt mr-1"></i> Sair
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-light m-2">
                  <i className="fa fa-sign-in-alt mr-1"></i> Entrar
                </NavLink>
                {/* <NavLink to="/register" className="btn btn-outline-light m-2">
                  <i className="fa fa-user-plus mr-1"></i> Registrar
                </NavLink> */}
              </>
            )}
            <NavLink to="/cart" className="btn btn-outline-light m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Carrinho (
              {state.length}){" "}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
