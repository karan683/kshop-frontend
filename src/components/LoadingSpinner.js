import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const LoadingSpinnner = () => {
  return (
    <div className="flex justify-center mt-2">
      <Loader
        type="Puff"
        color="black"
        height={"50px"}
        width={'50px'}
        timeout={3000} //3 secs
      />
    </div>
  );
};

export default LoadingSpinnner;
