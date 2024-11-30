import React, { useState, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import api from "../tools/api";
import { Footer, Navbar } from "../components";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(false);

  const addItem = useCallback(
    (product) => {
      dispatch(addCart(product));
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (product) => {
      dispatch(delCart(product));
    },
    [dispatch]
  );

  let subtotal = 0;
  let shipping = 30.0;
  let totalItems = 0;

  state.forEach((item) => {
    subtotal += item.price * item.qty;
    totalItems += item.qty;
  });

  console.log("STATE: ", state);

  const finishPurchase = async () => {
    setLoading(true);
    const filteredItems = state.map((item) => ({
      name: item.name,
      price: Number(item.price).toFixed(2),
      quantity: item.qty,
      product_id: item.id,
      product_category_id: item.category,
    }));

    try {
      const response = await api.post("/checkout/session", {
        userId: JSON.parse(localStorage.getItem("user"))?.id,
        observation,
        items: filteredItems,
      });
      window.location.href = response.data.url;
    } catch (err) {
      console.error("Erro: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {state.length === 0 ? (
        <EmptyCart />
      ) : (
        <section
          style={{
            marginTop: "30px",
          }}
          className="h-100 gradient-custom"
        >
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Lista de Itens</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item) => (
                      <div key={item.id}>
                        <div className="row d-flex align-items-center">
                          <div className="col-lg-3 col-md-12">
                            <img
                              src={"/assets/notfound_img.png"}
                              alt={item.name}
                              width={100}
                              height={75}
                              className="bg-image rounded"
                            />
                          </div>
                          <div className="col-lg-5 col-md-6">
                            <p>
                              <strong>{item.name}</strong>
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn px-3"
                                onClick={() => removeItem(item)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <p className="mx-5">{item.qty}</p>
                              <button
                                className="btn px-3"
                                onClick={() => addItem(item)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <p className="text-start text-md-center">
                              <strong>
                                {item.qty} x ${item.price}
                              </strong>
                            </p>
                          </div>
                        </div>
                        <hr className="my-4" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Observação</h5>
                  </div>
                  <div className="card-body">
                    <textarea
                      className="form-control"
                      placeholder="Digite observações adicionais aqui..."
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Resumo do Pedido</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Produtos ({totalItems})
                        <span>${Math.round(subtotal)}</span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <strong>Total</strong>
                        <span>
                          <strong>${Math.round(subtotal)}</strong>
                        </span>
                      </li>
                    </ul>
                    <button
                      onClick={finishPurchase}
                      className="btn btn-dark btn-lg btn-block"
                      disabled={loading}
                      style={{
                        backgroundColor: "#422458",
                        color: "#fff",
                      }}
                    >
                      {loading ? "Carregando..." : "Finalizar Compra"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Cart;

const EmptyCart = () => {
  return (
    <div
      style={{
        marginTop: "30px",
      }}
      className="container"
    >
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Seu Carrinho está Vazio</h4>
          <Link to="/" className="btn  btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};
