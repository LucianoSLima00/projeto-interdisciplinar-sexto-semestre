import React from "react";
import { Navbar, Footer } from "../components"; 
import Marquee from "react-fast-marquee"; 
import { Link } from "react-router-dom";

const AccountPage = () => {
  const user = {
    name: "João da Silva",
    email: "joao.silva@example.com",
    address: "Rua Exemplo, 123, São Paulo",
  };

  const orders = [
    { id: 1, date: "10/10/2023", total: 99.99, status: "Entregue" },
    { id: 2, date: "15/11/2023", total: 149.99, status: "Em Andamento" },
    { id: 3, date: "20/11/2023", total: 249.99, status: "Cancelado" },
  ];

  const recommendedProducts = [
    {
      id: 101,
      name: "Produto Exemplo 1",
      price: 59.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 102,
      name: "Produto Exemplo 2",
      price: 89.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 103,
      name: "Produto Exemplo 3",
      price: 129.99,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1 className="text-center">Minha Conta</h1>
        <hr />
        
        {/* Account Information Section */}
        <section className="my-4">
          <h3>Informações da Conta</h3>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Endereço:</strong> {user.address}</p>
          <Link to="/edit-account" className="btn btn-outline-dark">Editar Informações</Link>
        </section>

        <hr />

        {/* Order History Section */}
        <section className="my-4">
          <h3>Histórico de Pedidos</h3>
          {orders.map((order) => (
            <div key={order.id} className="border rounded p-3 mb-2">
              <p><strong>Pedido:</strong> #{order.id}</p>
              <p><strong>Data:</strong> {order.date}</p>
              <p><strong>Total:</strong> R$ {order.total.toFixed(2)}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <Link to={`/order/${order.id}`} className="btn btn-link">Ver Detalhes</Link>
            </div>
          ))}
        </section>

        <hr />

        {/* Recommended Products Slide Bar */}
        <section className="my-4">
          <h3>Recomendados para Você</h3>
          <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
            {recommendedProducts.map((product) => (
              <div key={product.id} className="card mx-2 text-center" style={{ width: "150px" }}>
                <img src={product.image} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">R$ {product.price.toFixed(2)}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-dark btn-sm">
                    Ver Produto
                  </Link>
                </div>
              </div>
            ))}
          </Marquee>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;
