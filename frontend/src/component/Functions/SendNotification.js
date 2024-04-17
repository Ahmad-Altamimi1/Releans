import React, { useState } from "react";
import axios from "../api/axios";

export default function SendNotification(formData, id, type, OldData) {
  let message = "";
  switch (type) {
    case "add":
      message = `  has been added  " ${formData.name}" Product and quantity is ${formData.quantity} with Price ${formData.price}$ for unit.`;
      break;
    case "edit":
      function compareObjects(OldData, formData) {
        const differences = [];

        for (let key in OldData) {
          if (OldData.hasOwnProperty(key) && formData.hasOwnProperty(key)) {
            if (OldData[key] !== formData[key]) {
              differences.push(
                `The product changed its ${key} from ${OldData[key]} to ${formData[key]}`
              );
            }
          }
        }

        return differences;
      }
      const diffs = compareObjects(OldData, formData);
      if (diffs.length > 0) {
        message = diffs.join(" and ");
      } else {
        message = "No differences found.";
      }
      // message = ` has been edited "${formData.name}" Product .`;
      break;
    case "delete":
      message = ` has been deleted "${formData.name}" Product.`;
      break;
  }
  const formDatanotification = {
    userId: 1,
    productId: id,
    message: message,
  };

  const handleSubmit = async (e) => {
    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.token;

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
      await axios.post("/notifications", formDatanotification);
      console.log("notifications added successfully");
    } catch (error) {
      console.error("Error adding notifications:", error.message);
    }
  };

  handleSubmit();

  return null;
}
