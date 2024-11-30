import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Limpa o campo de busca após a navegação
    }
  };

  return (
    <>
      {/* Slidebar */}
      <div className="container mt-5">
        {" "}
        {/* Aumentei a margem superior */}
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/main3.png.jpg"
              alt="Primeiro Slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Ofertas Especiais</h3>
              <p>Confira nossas melhores promoções.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/main1.png.jpg"
              alt="Segundo Slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Novidades Chegando</h3>
              <p>Seja o primeiro a descobrir os lançamentos.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./assets/main2.png.jpg"
              alt="Terceiro Slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Compras Confiáveis</h3>
              <p>Segurança e confiança para sua melhor experiência.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Buscador Compacto */}
      <div className="container mt-4">
        <form
          onSubmit={handleSearchSubmit}
          className="d-flex justify-content-center"
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{
              width: "70%",
              borderRadius: "20px 0 0 20px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "30%",
              borderRadius: "0 20px 20px 0",
              padding: "10px",
            }}
          >
            Buscar
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
