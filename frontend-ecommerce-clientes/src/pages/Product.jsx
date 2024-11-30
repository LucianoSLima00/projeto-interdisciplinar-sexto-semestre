import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";
import api from "../tools/api";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  console.log("ID: ", id);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        setLoading(true);
        setLoading2(true);
        await api
          .get(`product/${id}`)
          .then((res) => {
            console.log("RESULT: ", res);
            setProduct(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log("ERROR: ", err);
            setLoading(false);
          });
        // setProduct(response.data);
        setLoading(false);
        // const response2 = await fetch(
        //   `https://fakestoreapi.com/products/category/${data.category}`
        // );
        // const response2 = await fetch(`https://fakestoreapi.com/products`);
        // const data2 = await response2.json();
        // setSimilarProducts(data2);
        // setLoading2(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    console.log("Product: ", product);
    console.log("ID: ", id);
    return (
      <>
        {product !== "" && (
          <div className="container my-5 py-2">
            <div
              style={{
                marginTop: "30px",
              }}
              className="row"
            >
              <div className="col-md-6 col-sm-12 py-3">
                <img
                  className="img-fluid"
                  src={"/assets/notfound_img.png"}
                  alt={product.name}
                  width="400px"
                  height="400px"
                />
              </div>
              <div className="col-md-6 col-md-6 py-5">
                {/* <h4 className="text-uppercase text-muted">{product.category}</h4> */}
                <h1 className="display-5">{product.name}</h1>
                {/* <p className="lead">
                 {product.rating && product.rating.rate}{" "}
                 <i className="fa fa-star"></i>
               </p> */}
                <h3 className="display-6  my-4">${product.price}</h3>
                <p className="lead">{product.description}</p>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => addProduct(product)}
                >
                  Adicionar ao Carrinho
                </button>
                <Link
                  to="/cart"
                  style={{
                    backgroundColor: "#422458",
                    color: "#fff",
                  }}
                  className="btn btn-dark mx-3"
                >
                  Voltar para o Carrinho
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  // const ShowSimilarProduct = () => {
  //   return (
  //     <>
  //       <div className="py-4 my-4">
  //         <div className="d-flex">
  //           {similarProducts.map((item) => {
  //             return (
  //               <div key={item.id} className="card mx-4 text-center">
  //                 <img
  //                   className="card-img-top p-3"
  //                   src={
  //                     product.images !== null
  //                       ? product.images[0]
  //                       : "https://via.placeholder.com/300"
  //                   }
  //                   alt="Card"
  //                   height={300}
  //                   width={300}
  //                 />
  //                 <div className="card-body">
  //                   <h5 className="card-title">
  //                     {item.name.substring(0, 15)}...
  //                   </h5>
  //                 </div>
  //                 {/* <ul className="list-group list-group-flush">
  //                   <li className="list-group-item lead">${product.price}</li>
  //                 </ul> */}
  //                 <div className="card-body">
  //                   <Link
  //                     to={"/product/" + item.id}
  //                     className="btn btn-dark m-1"
  //                   >
  //                     Comprar Agora
  //                   </Link>
  //                   <button
  //                     className="btn btn-dark m-1"
  //                     onClick={() => addProduct(item)}
  //                   >
  //                     Adicionar ao Carrinho
  //                   </button>
  //                 </div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        {/* <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">Você também pode gostar</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Product;
