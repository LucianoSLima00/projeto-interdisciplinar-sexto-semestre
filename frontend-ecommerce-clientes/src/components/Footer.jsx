import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">
              PI 6º Semestre{" "}
              <a
                href="https://site.fatecfranca.edu.br/"
                className="text-decoration-underline text-dark fs-5"
                target="_blank"
                rel="noreferrer"
              >
                PI 6 Semestre
              </a>
            </p>
            <a
              className="text-dark fs-4"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>

        {/* Links adicionais */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <a
            href="/trabalhe-conosco"
            className="text-dark text-decoration-none"
          >
            Trabalhe conosco
          </a>
          <a
            href="/termos-condicoes"
            className="text-dark text-decoration-none"
          >
            Termos e condições
          </a>
          <a
            href="/promocoes"
            className="text-dark text-decoration-none"
          >
            Promoções
          </a>
          <a
            href="/privacidade"
            className="text-dark text-decoration-none"
          >
            Como cuidamos da sua privacidade
          </a>
          <a
            href="/acessibilidade"
            className="text-dark text-decoration-none"
          >
            Acessibilidade
          </a>
          <a href="/contato" className="text-dark text-decoration-none">
            Contato
          </a>
          <a
            href="/seguros"
            className="text-dark text-decoration-none"
          >
            Informações sobre seguros
          </a>
          <a
            href="/afiliados"
            className="text-dark text-decoration-none"
          >
            Programa de Afiliados
          </a>
          <a
            href="/black-friday"
            className="text-dark text-decoration-none"
          >
            Black Friday
          </a>
        </div>

        {/* Frase sobre formas de pagamento */}
        <div className="mt-4">
          <p className="text-dark">
            Formas de pagamento aceitas: cartões de crédito (Visa, MasterCard,
            Elo e American Express), cartões de débito (Visa e Elo), Boleto e
            Pix.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
