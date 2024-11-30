import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../components";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-5 text-center">
        <h1 className="display-4 text-success">Pagamento Realizado com Sucesso!</h1>
        <p className="lead">Obrigado por sua compra. Seu pedido foi processado e está sendo preparado para envio.</p>
        <div className="my-4">
          <i className="fa fa-check-circle text-success" style={{ fontSize: "100px" }}></i>
        </div>
        <Link to="/" className="btn btn-primary btn-lg mt-4">
          Voltar para a Página Inicial
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
