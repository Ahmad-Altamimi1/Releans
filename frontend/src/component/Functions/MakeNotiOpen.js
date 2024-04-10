import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

async function updateNotification(id) {
  try {
    await axios.put(`http://127.0.0.1:8000/api/notifications/${id}`, {
      open: "true",
    });
  } catch (error) {
    // Handle error, e.g., show an error message
    console.error("Error updating notification:", error.message);
  }
}

const fetchNotifications = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/notReednotifications"
    );
    return response.data.notReednotifications;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const MakeNotiOpen = ({ isOpen }) => {
  const {
    data: openotifications,
    isLoading,
    isError,
  } = useQuery("notReednotifications", fetchNotifications);

  useEffect(() => {
    if (openotifications && openotifications.length > 0) {
      // Iterate through notifications and update their status
      openotifications.forEach((notification) => {
        updateNotification(notification.id);
      });
    }
  }, [openotifications]);

  return null;
};

export default MakeNotiOpen;
