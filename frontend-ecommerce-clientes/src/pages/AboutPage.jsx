import React from 'react'
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Sobre Nós</h1>
        <hr />
        <p className="lead text-center">
          A Ecommerce PI nasceu de uma simples ideia: oferecer uma experiência de compra online que seja acessível, confiável e focada nas necessidades de cada cliente. Fundada em 2020, em um momento de grandes mudanças no comércio digital, nossa missão sempre foi fornecer produtos de alta qualidade com um serviço excepcional. 
        </p>
        <p className="lead text-center">
          Em poucos anos, crescemos de uma pequena loja virtual para uma das plataformas mais respeitadas de e-commerce, com milhares de clientes satisfeitos. Nossa equipe trabalha incansavelmente para trazer as melhores ofertas em roupas masculinas, femininas, joias e eletrônicos, garantindo que cada compra seja segura e que nossos clientes estejam sempre satisfeitos.
        </p>
        <p className="lead text-center">
          Na Ecommerce PI, acreditamos que cada produto conta uma história e que cada cliente merece ser tratado com respeito e dedicação. Nosso compromisso é continuar inovando, oferecendo produtos modernos e um atendimento ao cliente de excelência. TopStore é mais do que uma loja, é uma experiência de compra que conecta você com o melhor do mercado digital.
        </p>

        <h2 className="text-center py-4">Nossos Produtos</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Roupas Masculinas" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Roupas Masculinas</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Roupas Femininas" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Roupas Femininas</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Joias" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Joias</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Eletrônicos" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Eletrônicos</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage
