import React, { useState } from "react";
import axios from "axios";

export default function SendNotification(formData, id, type) {
  let message = "";
  switch (type) {
    case "add":
      message = `  has been added  " ${formData.name}" Product and quantity is ${formData.quantity} with Price ${formData.price}$ for unit.`;
      break;
    case "edit":
      message = ` has been edited "${formData.name}" Product .`;
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
      await axios.post(
        "http://127.0.0.1:8000/api/notifications",
        formDatanotification
      );
      console.log("notifications added successfully");
    } catch (error) {
      console.error("Error adding notifications:", error.message);
    }
  };

  handleSubmit();

  return null;
}
