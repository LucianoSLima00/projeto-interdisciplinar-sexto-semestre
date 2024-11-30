import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";
import api from "../tools/api";
import toast from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (data) => {
    console.log("Data: ", data);
    await api
      .post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log("Erro: ", err.response.data.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Entrar</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="my-3">
                <label htmlFor="display-4">Endereço de Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="nome@exemplo.com"
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Senha"
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
              </div>
              <div className="my-3">
                <p>
                  É novo aqui?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "#422458",
                    }}
                    className=""
                  >
                    Registrar-se
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button
                  style={{
                    backgroundColor: "#422458",
                    color: "#fff",
                    width: "100%",
                  }}
                  className="my-2 mx-auto btn btn-dark"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(data);
                  }}
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
