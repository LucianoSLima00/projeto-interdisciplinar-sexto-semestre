import React from "react";
import { Footer, Navbar, Product } from "../components";

const Products = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: "80px",
        }}
      >
        <Product />
      </div>
      <Footer />
    </>
  );
};

export default Products;
