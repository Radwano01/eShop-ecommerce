import React from 'react';
import ReactDOM from 'react-dom';
import "./loader.scss";
import loaderImg from "../../assets/loader.gif";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
        <div className="loader">
            <img src={loaderImg} alt="loading..." />
        </div>
    </div>,
    document.getElementById("loader")
  );
}

export default Loader;
