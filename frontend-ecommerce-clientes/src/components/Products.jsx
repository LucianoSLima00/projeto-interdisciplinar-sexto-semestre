import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../tools/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const query = useQuery();
  const queryValue = query.get("query");
  console.log("queryValue: ", queryValue);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalPrice = dataUser.reduce(
    (acc, item) => acc + Number(item.total),
    0
  );
  const categoryNumber = (() => {
    const categoryCount = dataUser.reduce((acc, item) => {
      acc[item.product_category_number] =
        (acc[item.product_category_number] || 0) + 1;
      return acc;
    }, {});

    // Encontrar o ID com o maior número de ocorrências
    let mostFrequentCategory = null;
    let maxCount = 0;
    for (const [category, count] of Object.entries(categoryCount)) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentCategory = category;
      }
    }
    return mostFrequentCategory;
  })();
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    let componentMounted = true;

    const getProducts = async () => {
      try {
        setLoading(true);
        const response =
          queryValue !== null
            ? await api.get(`/product?limit=100&name=${queryValue}`)
            : await api.get(`/product?limit=100`);
        if (componentMounted) {
          console.log("Response: ", response);
          setData(response.data.items);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (componentMounted) setLoading(false);
      }
    };

    const getInfosOrdersByUser = async () => {
      try {
        const response = await api.get(
          `/orderItem/user/${JSON.parse(localStorage.getItem("user"))?.id}`
        );
        if (componentMounted) {
          setDataUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user order info:", error);
      }
    };

    const getProductsLogged = async () => {
      try {
        setLoading(true);
        const response =
          queryValue !== null
            ? await api.get(
                `/product/logged?limit=100&name=${queryValue}&customer_state_id=${
                  JSON.parse(localStorage.getItem("user"))?.state
                }&price=${
                  totalPrice / dataUser?.length
                }&review_score=5&product_category_id=${categoryNumber}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
            : await api.get(
                `/product/logged?limit=100&customer_state_id=${
                  JSON.parse(localStorage.getItem("user"))?.state
                }&price=${
                  totalPrice / dataUser?.length
                }&review_score=5&product_category_id=${categoryNumber}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
        if (componentMounted) {
          console.log("Response: ", response);
          setData(response.data.items);
        }
      } catch (error) {
        console.error("Error fetching logged products:", error);
      } finally {
        if (componentMounted) setLoading(false);
      }
    };

    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        await getInfosOrdersByUser();

        if (dataUser?.length > 0) {
          console.log("Com dados de usuário");
          await getProductsLogged();
        } else {
          console.log("Sem dados de usuário - carregando produtos padrão");
          await getProducts();
        }
      } else {
        console.log("Sem token - carregando produtos padrão");
        await getProducts();
      }
    };

    fetchData();

    return () => {
      componentMounted = false;
    };
  }, [dataUser?.length, totalPrice, categoryNumber, queryValue]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className=" text-center " key={product.id}>
                <img
                  className="card-img-top "
                  src={"/assets/notfound_img.png"}
                  alt="Card"
                  height={310}
                />
                <div className="card-body mt-4">
                  <h5 className="card-title">
                    {product.name.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">R$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    style={{
                      backgroundColor: "#422458",
                      color: "#fff",
                    }}
                    className="btn btn-dark m-1"
                  >
                    Comprar Agora
                  </Link>
                  {/* <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Adicionado ao carrinho");
                      addProduct(product);
                    }}
                  >
                    Adicionar ao Carrinho
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}
        {!localStorage.getItem("token") && (
          <div className=" mt-5">
            <div className="col-12 text-center">
              <div
                style={{
                  backgroundColor: "#422458",
                  color: "#fff",
                }}
                className="p-4"
                role="alert"
              >
                <h4 className="alert-heading">
                  Entre para receber recomendações personalizadas!
                </h4>
                <p>
                  Faça login para ver produtos que combinam com seus interesses
                  e histórico de compras.
                </p>
                <Link to="/login">
                  <button
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                    }}
                    className="btn "
                  >
                    Fazer Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // Configuração do carrossel com ajustes de espaçamento
  const carouselSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Exibe 4 produtos por vez
    slidesToScroll: 1,
    centerMode: false, // Adiciona o efeito de centralizar os cards
    nextArrow: <button className="slick-arrow slick-next">→</button>, // Seta para avançar
    prevArrow: <button className="slick-arrow slick-prev">←</button>, // Seta para retroceder
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row"></div>

        {/* Best Selling Products Section */}
        <div
          style={{
            marginTop: "20px",
            marginBottom: "80px",
          }}
          className="row"
        >
          <div className="col-12">
            <h3
              style={{
                marginBottom: "20px",
              }}
              className="text-center"
            >
              Produtos Mais Vendidos
            </h3>
            <Slider {...carouselSettings}>
              {" "}
              {/* Carrossel aqui */}
              {data.slice(0, 10).map((product) => (
                <div key={product.id} className=" text-center mx-3">
                  <img
                    className="card-img-top p-3"
                    src={"/assets/notfound_img.png"}
                    alt="Card"
                    height={200}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.name.substring(0, 12)}...
                    </h5>
                    <p className="card-text">R$ {product.price}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
