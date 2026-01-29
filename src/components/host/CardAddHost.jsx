import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";



const stripePromise = loadStripe(
  "pk_test_51OJYBTBtvbMCJV4HYgcTe7suuWdRm8p0YqsRVOT7VU8z1CmCeMwK1MSIYRp0NQRaBiH26gE3VgmENFKybIgNJVrd00UGnNavL3"
);

const CardAddHost = ({ enablePayment, callBack, allowCard }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

   const [isMobileWidth, setIsMobileWidth] = useState(false);
  
    useEffect(() => {
      const checkWindowWidth = () => {
        setIsMobileWidth(window.innerWidth <= 768);
      };
  
      checkWindowWidth();
      window.addEventListener('resize', checkWindowWidth);
  
      return () => window.removeEventListener('resize', checkWindowWidth);
    }, []);
  //

  useEffect(() => {
   if(enablePayment) {
     handleSubmit();
   }
  }, [enablePayment]);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardNumberElement);

    try {
      const { token, error } = await stripe.createToken(cardElement, {
        currency: "usd", 
      });
      
      const cardType = token.card.funding;
      if(allowCard=="debit" && cardType !== "debit") {
        toast.error("Only debit cards are allowed. Please use a debit card.");
        return;
      }

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Card added successfully");
        callBack(token.id);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    base: {
      fontSize: "14px",
      color: "#000",
      "::placeholder": { color: "#757575" },
    },
    invalid: { color: "#f00" },
  };

  const wrapperStyle = {
    // display:'flex',
    border:isMobileWidth? "":"1px solid #ccc",
    borderRadius: "25px",
    padding: "10px",
    width: "100%",
    height : "45px",
    marginBottom: "15px",

  };

  return (
    <div className="card-form" style={{ width: "100%", margin: "auto" }}>
      <label style={{ fontSize: 14, fontWeight: "500" }}>
        Card Number:
      </label>
  
{
  isMobileWidth ? (
    <div
      style={{
        ...wrapperStyle,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src="./images/cardbankPayment/card_number_icon.svg"
        style={{ width: "25px", height: "25px" }}
      />

      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
           borderRadius: "10px",
          padding: "10px",
          width: "100%",
          height: "45px",
          marginBottom: "15px",
          marginTop: "10px",
        }}
      >
        <CardNumberElement options={{ style: inputStyle }} />
      </div>
    </div>
  ) : (
    <div
      style={
        wrapperStyle}
      
    >
      <CardNumberElement options={{ style: inputStyle }} />
    </div>
  )
}



      <label style={{ fontSize: 14, fontWeight: "500" }}>
        CVV Number:
      </label>

 {
    isMobileWidth ? (
      <>
            <div style={{
  ...wrapperStyle,
  display: "flex",
  alignItems: "center",
  gap: "10px"
}}>
        <img
    src="./images/cardbankPayment/cvv_number.svg"
    style={{ width: "25px", height: "25px" }}
  />

  <div style={{ flex: 1 ,border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "10px",
  width: "100%",
  height : "45px",
  marginBottom: "15px",
  marginTop:'10px' }}>
   <CardCvcElement options={{ style: inputStyle }} />
  </div>
  </div>
      </>
    ):(
   <div style={wrapperStyle}>
        <CardCvcElement options={{ style: inputStyle }} />
      </div> 
    )
  }
{/* 
      <div style={wrapperStyle}>
        <CardCvcElement options={{ style: inputStyle }} />
      </div> */}

      <label style={{ fontSize: 14, fontWeight: "500" }}>
        Expiration Date:
      </label>


  {
    isMobileWidth ? (
      <>
            <div style={{
  ...wrapperStyle,
  display: "flex",
  alignItems: "center",
  gap: "10px"
}}>
        <img
    src="./images/cardbankPayment/calendar.svg"
    style={{ width: "25px", height: "25px" }}
  />

  <div style={{ flex: 1 ,border: "1px solid #ccc",
   borderRadius: "10px",
  padding: "10px",
  width: "100%",
  height : "45px",
  marginBottom: "15px",
  marginTop:'10px' }}>
   <CardExpiryElement options={{ style: inputStyle }} />
  </div>
  </div>
      </>
    ):(
   <div style={wrapperStyle}>
        <CardExpiryElement options={{ style: inputStyle }} />
      </div> 
    )
  }


{/*       
      <div style={wrapperStyle}>
        <CardExpiryElement options={{ style: inputStyle }} />
      </div> */}

    </div>
  );
};

const StripePayment = ({ enablePayment, callBack, allowCard }) => (
  <Elements stripe={stripePromise}>
    <CardAddHost enablePayment={enablePayment} callBack={callBack} allowCard={allowCard} />
  </Elements>
);

export default StripePayment;
