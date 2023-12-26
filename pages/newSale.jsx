import React, { useState } from "react";
import SalesModal from "../components/SalesModal";
import TarjetModal from "../components/TarjetModal";
import Link from "next/link";
import { useRouter } from "next/router";
import CheqModal from "../components/CheqModal";
import dbConnect from "../lib/dbConnect";
import Company from "../models/Company";
import CurrentAccountModal from "../components/CurrentAccountModal";

// material icons
import StoreIcon from "@mui/icons-material/Store";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function NewSale(companys) {
  const [salesModalIsOpen, setSalesModalIsOpen] = useState(false);
  const [cheqModalIsOpen, setCheqModalIsOpen] = useState(false);
  const [tarjetModalIsOpen, setTarjetModalIsOpen] = useState(false);
  const [CurrentAccountModalIsOpen, setCurrentAccountModalIsOpen] =
    useState(false);

  const router = useRouter();

  

  const openSalesModal = () => {
    setSalesModalIsOpen(true);
  };

  const closeSalesModal = () => {
    setSalesModalIsOpen(false);
  };

  const openCheqModal = () => {
    setCheqModalIsOpen(true);
  };

  const closeCheqModal = () => {
    setCheqModalIsOpen(false);
  };

  const openTarjetModal = () => {
    setTarjetModalIsOpen(true);
  };

  const closeTarjetModal = () => {
    setTarjetModalIsOpen(false);
  };

  const openCurrentAccount = () => {
    setCurrentAccountModalIsOpen(true);
  };

  const closeCurrentAccount = () => {
    setCurrentAccountModalIsOpen(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "1%" }}>
        <h1>
          Nueva Venta
          <LocalOfferIcon className="iconhead" />
        </h1>
      </div>
      <hr></hr>

      <div className="container text-center" style={{ margin: "1%" }}>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-secondary float-start">
              <Link
                href="/nuevo"
                style={{ textDecoration: "none", color: "white" }}
              >
                <ArrowBackIcon />
              </Link>
            </button>
          </div>

          <div className="col box-index1 btn btn-danger">
            <Link href="/newSaleArticle" style={{ textDecoration: "none" }}>
              <StoreIcon className="box-index" />
              <h2 className="boxh2">Articulos</h2>
            </Link>
          </div>
          <div className="col box-index1 btn btn-primary">
            <CurrencyExchangeIcon
              className="box-index"
              onClick={openSalesModal}
            />
            <h2 className="boxh2">Efectivo</h2>
          </div>
        </div>
        <div className="row">
          <div className="col box-index1 btn btn-dark">
            <SubtitlesIcon onClick={openCheqModal} className="box-index" />
            <h2 className="boxh2">Cheques</h2>
          </div>
          <div className="col  box-index1 btn btn-secondary">
            <CreditCardIcon className="box-index" onClick={openTarjetModal} />
            <h2 className="boxh2">Tarjeta Credito</h2>
          </div>
          <div className="col box-index1 btn btn-info">
            <EditNoteIcon className="box-index" onClick={openCurrentAccount} />
            <h2 className="boxh2">Cuenta Corriente</h2>
          </div>
        </div>
      </div>
      <div></div>

      <SalesModal
        isOpen={salesModalIsOpen}
        closeModal={closeSalesModal}
        {...companys}
      />

      <TarjetModal
        isOpen={tarjetModalIsOpen}
        closeModal={closeTarjetModal}
        {...companys}
      />
      <CheqModal
        isOpen={cheqModalIsOpen}
        closeModal={closeCheqModal}
        {...companys}
      />
      <CurrentAccountModal
        isOpen={CurrentAccountModalIsOpen}
        closeModal={closeCurrentAccount}
        {...companys}
      />
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const result = await Company.find({});
  const companys = result.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });

  return { props: { companys } };
}