import React from "react";
import { Circles, ThreeCircles } from "react-loader-spinner";
ThreeCircles;

export default function PreLoader() {
  return (
    <div className="d-flex align-items-center justify-content-center my-5 pt-5">
      {/* <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> */}
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
