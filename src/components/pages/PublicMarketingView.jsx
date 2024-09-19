import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseCon";
import { doc, getDoc } from "firebase/firestore";
import "./publicMarketingView.css";

const PublicMarketingView = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const marketingDocRef = doc(db, "marketing", userId);
        const marketingDoc = await getDoc(marketingDocRef);

        if (marketingDoc.exists()) {
          const data = marketingDoc.data().products || [];
          setProducts(data);
        } else {
          console.log("No products found for this user.");
        }
      } catch (error) {
        console.error("Error fetching product data: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="public-marketing-view">
      <h1>Products Available</h1>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className="product-item">
            <h2>{product.productName}</h2>
            <p>Quantity: {product.quantity} kg</p>
            <p>Price per kg: ${product.price.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default PublicMarketingView;
