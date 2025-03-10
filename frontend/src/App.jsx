import React, { useState, useEffect } from "react";
import { fetchSensorData } from "./api"; // Assume this is in a separate api.js file
import { motion } from "framer-motion";
import { FaExclamationCircle, FaCheckCircle, FaRestroom, FaUsers } from "react-icons/fa";

export default function App() {
  const [sensorData, setSensorData] = useState({
    odorLevel: 40,
    soapLevel: 75,
    motionDetected: false,
  });
  const [userCount, setUserCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSensorData();
      setSensorData(data);
      if (data.motionDetected) setUserCount((prev) => prev + 1);
      setShowAlert(data.odorLevel < 50);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Inline styles
  const styles = {
    dashboard: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f7fa",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      backgroundColor: "#1a3c34",
      padding: "20px",
      borderRadius: "10px 10px 0 0",
      color: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    headerTitle: {
      margin: 0,
      fontSize: "28px",
      fontWeight: 600,
    },
    alert: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#e63946",
      color: "white",
      padding: "15px",
      margin: "20px 0",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    card: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
      textAlign: "center",
      transition: "transform 0.2s ease",
    },
    cardTitle: {
      margin: "0 0 15px",
      fontSize: "20px",
      color: "#333",
    },
    progressBar: {
      height: "10px",
      backgroundColor: "#e0e0e0",
      borderRadius: "5px",
      overflow: "hidden",
      marginBottom: "10px",
    },
    progressFill: (value, threshold, goodColor, badColor) => ({
      height: "100%",
      width: `${value}%`,
      backgroundColor: value < threshold ? badColor : goodColor,
      transition: "width 0.5s ease",
    }),
    cardText: {
      margin: 0,
      fontSize: "18px",
      color: "#555",
    },
    statusActive: {
      color: "#2ecc71",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      justifyContent: "center",
    },
    statusInactive: {
      color: "#e63946",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      justifyContent: "center",
    },
    userCount: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      fontSize: "24px",
      color: "#1a3c34",
    },
  };

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <header style={styles.header}>
        <FaRestroom size={40} color="#ffffff" />
        <h1 style={styles.headerTitle}>Smart Washroom Monitor</h1>
      </header>

      {/* Bad Smell Alert */}
      {showAlert && (
        <motion.div
          style={styles.alert}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <FaExclamationCircle size={20} />
          <span>Bad Smell Detected! Odor Level: {sensorData.odorLevel}%</span>
        </motion.div>
      )}

      {/* Grid Container */}
      <div style={styles.gridContainer}>
        {/* Odor Level */}
        <motion.div whileHover={{ scale: 1.05 }} style={styles.card}>
          <h2 style={styles.cardTitle}>Odor Level</h2>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(sensorData.odorLevel, 50, "#2ecc71", "#e63946")} />
          </div>
          <p style={styles.cardText}>{sensorData.odorLevel}%</p>
        </motion.div>

        {/* Soap Level */}
        <motion.div whileHover={{ scale: 1.05 }} style={styles.card}>
          <h2 style={styles.cardTitle}>Soap Level</h2>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(sensorData.soapLevel, 20, "#3498db", "#e63946")} />
          </div>
          <p style={styles.cardText}>{sensorData.soapLevel}%</p>
        </motion.div>

        {/* Motion Detected */}
        <motion.div whileHover={{ scale: 1.05 }} style={styles.card}>
          <h2 style={styles.cardTitle}>Motion Status</h2>
          <p style={sensorData.motionDetected ? styles.statusActive : styles.statusInactive}>
            {sensorData.motionDetected ? (
              <>
                <FaCheckCircle /> Motion Detected
              </>
            ) : (
              <>
                <FaExclamationCircle /> No Motion
              </>
            )}
          </p>
        </motion.div>

        {/* User Count */}
        <motion.div whileHover={{ scale: 1.05 }} style={styles.card}>
          <h2 style={styles.cardTitle}>User Count</h2>
          <div style={styles.userCount}>
            <FaUsers size={30} />
            <span>{userCount}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}