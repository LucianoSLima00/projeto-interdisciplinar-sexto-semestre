import React from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Registrar-se</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="form my-3">
                <label htmlFor="Nome">Nome Completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="Nome"
                  placeholder="Digite seu nome"
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Endereço de Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="nome@exemplo.com"
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Senha">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="Senha"
                  placeholder="Senha"
                />
              </div>
              <div className="my-3">
                <p>Já tem uma conta? <Link to="/login" className="text-decoration-underline text-info">Entrar</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled>
                  Registrar-se
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

export default Register;
