import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseCon";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuth from "../auth/useAuth";
import "./marketing.css";

const Marketing = () => {
  const { user, loading } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [updatedPrices, setUpdatedPrices] = useState({});
  const [warnings, setWarnings] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(true);

  useEffect(() => {
    if (loading) return; // Wait for loading to finish

    if (!user) {
      console.log("No user is authenticated");
      return;
    }

    const userId = user.uid;

    const fetchMarketingData = async () => {
      try {
        if (!userId) {
          throw new Error("Invalid user ID");
        }

        const marketingDocRef = doc(db, "marketing", userId);
        const marketingDoc = await getDoc(marketingDocRef);

        if (marketingDoc.exists()) {
          const data = marketingDoc.data().products || [];
          const analyticsDocRef = doc(db, "analyticsReports", userId);
          const analyticsDoc = await getDoc(analyticsDocRef);

          if (analyticsDoc.exists()) {
            // Ensure analyticsData is an array
            const analyticsData = Array.isArray(analyticsDoc.data().marketing) ? analyticsDoc.data().marketing : [];

            const warningsList = data.map(item => {
              const matchingAnalyticsItem = analyticsData.find(analyticsItem => analyticsItem.productName === item.productName);
              if (matchingAnalyticsItem && item.quantity !== matchingAnalyticsItem.quantity) {
                return `Warning: Quantity mismatch for ${item.productName}`;
              }
              return null;
            }).filter(warning => warning !== null);

            setWarnings(warningsList);
            setInventory(data);
          } else {
            console.log("No analytics data found");
          }
        } else {
          // Initialize with an empty object having a 'products' key
          await setDoc(marketingDocRef, { products: [] });
          console.log("Created new marketing document.");
          setInventory([]);
        }
      } catch (error) {
        console.error("Error fetching marketing data: ", error.message);
      }
    };

    const createMarketingDocument = async () => {
      try {
        if (!userId) {
          throw new Error("Invalid user ID");
        }

        const marketingDocRef = doc(db, "marketing", userId);
        const marketingDoc = await getDoc(marketingDocRef);

        if (!marketingDoc.exists()) {
          // Initialize with an empty object having a 'products' key
          await setDoc(marketingDocRef, { products: [] });
          console.log("Created new marketing document.");
        }
      } catch (error) {
        console.error("Error creating marketing document: ", error.message);
      }
    };

    createMarketingDocument();
    fetchMarketingData();
  }, [user, loading]);

  const handlePriceChange = (index, value) => {
    setUpdatedPrices({
      ...updatedPrices,
      [index]: value,
    });
  };

  const handleSavePrices = async () => {
    try {
      const userId = user?.uid;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const updatedInventory = inventory.map((item, index) => ({
        ...item,
        price: updatedPrices[index] || item.price,
      }));

      const marketingDocRef = doc(db, "marketing", userId);
      await setDoc(marketingDocRef, { products: updatedInventory });

      setInventory(updatedInventory);
      alert("Prices updated successfully!");
    } catch (error) {
      console.error("Error updating prices: ", error.message);
    }
  };

  const handleAddProduct = async () => {
    const productName = prompt("Enter the product name:");
    const quantity = prompt("Enter the quantity:");
    const price = prompt("Enter the price per kg:");

    if (productName && quantity && price) {
      try {
        const userId = user?.uid;

        if (!userId) {
          throw new Error("User not authenticated");
        }
        const productExists = inventory.some(item => item.productName.toLowerCase() === productName.toLowerCase());

        if (productExists) {
            alert("This product already exists in the inventory.");
            return;
        }

        const newProduct = {
          productName,
          quantity: parseInt(quantity, 10),
          price: parseFloat(price),
        };

        const marketingDocRef = doc(db, "marketing", userId);
        const marketingDoc = await getDoc(marketingDocRef);
        const data = marketingDoc.data().products || [];

        // Add the new product to the existing inventory
        data.push(newProduct);

        await setDoc(marketingDocRef, { products: data });
        setInventory(data);
        alert("Product added successfully!");
      } catch (error) {
        console.error("Error adding product: ", error.message);
      }
    } else {
      alert("Please provide all product details.");
    }
  };

  const handleRestoreData = async () => {
    try {
      const userId = user?.uid;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const marketingDocRef = doc(db, "marketing", userId);
      const marketingDoc = await getDoc(marketingDocRef);

      if (marketingDoc.exists()) {
        const data = marketingDoc.data().products || [];
        const analyticsDocRef = doc(db, "analyticsReports", userId);
        const analyticsDoc = await getDoc(analyticsDocRef);

        if (analyticsDoc.exists()) {
          // Ensure analyticsData is an array
          const analyticsData = Array.isArray(analyticsDoc.data().marketing) ? analyticsDoc.data().marketing : [];

          const warningsList = data.map(item => {
            const matchingAnalyticsItem = analyticsData.find(analyticsItem => analyticsItem.productName === item.productName);
            if (matchingAnalyticsItem && item.quantity !== matchingAnalyticsItem.quantity) {
              return `Warning: Quantity mismatch for ${item.productName}`;
            }
            return null;
          }).filter(warning => warning !== null);

          setWarnings(warningsList);
        }

        setInventory(data);
      } else {
        setInventory([]);
      }
    } catch (error) {
      console.error("Error restoring marketing data: ", error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not authenticated. Please log in.</p>;
  }

  return (
    <div id="Marketing" className="centered">
      <h1>Products Available & Prices</h1>
      {warnings.length > 0 && (
        <div className="warnings">
          {warnings.map((warning, index) => (
            <p key={index} className="warning-message">{warning}</p>
          ))}
        </div>
      )}
      <div className="inventory-list">
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <div key={index} className="inventory-item">
              <h2>{item.productName}</h2>
              <p>Kgs harvested: {item.quantity}</p>
              <label>
                Price per kg: {item.price}
                <input
                  type="number"
                  value={updatedPrices[index] || item.price || ""}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
              </label>
            </div>
          ))
        ) : (
          <p>No products found in the store</p>
        )}
      </div>
      <button className="updatemk" onClick={handleSavePrices}>Save Updated Prices</button>
      <button className="updatemk" onClick={handleAddProduct}>Add Product</button>
      <button className="updatemk" onClick={handleRestoreData}>Restore</button>
    </div>
  );
};

export default Marketing;
