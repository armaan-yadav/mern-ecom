import React from "react";
import { useSearchParams } from "react-router-dom";

const SuccessPaymentPage = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("reference"));
  return (
    <div>
      <h1>Payment successfull</h1>
      <p>Reference: {searchParams.get("reference")}</p>
    </div>
  );
};

export default SuccessPaymentPage;
