import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiId, apiJobDetails } from "./local.config";
import LoadingSpinner from "./components/LoadingSpinner";

const JobsBoard = () => {
  const [apiIds, setApiIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(6);

  const apiIdDetails = async () => {
    setLoading(true);
    try {
      const details = await axios.get(apiId);
      setApiIds(details);
      const details2 = details.data.slice(0, 6);

      const newDetails = details2.map(async (item) => {
        const response = await axios.get(
          `${apiJobDetails}/item/${item}.json`
        );

        return response.data;
      });

      const jobDetails = await Promise.all(newDetails);
      setData(jobDetails);
    } catch (err) {
      console.error(err, "Error occurred while fetching job details");
    } finally {
      setLoading(false);
    }
  };

  const loadObjects = async (firstCount, secondCount) => {
    setCount1((count) => count + firstCount);
    setCount2((count) => count + secondCount);

    const newCount1 = count1 + firstCount;
    const newCount2 = count2 + secondCount;

    try {
      const details2 = apiIds.data.slice(newCount1, newCount2);

      const newDetails = details2.map(async (item) => {
        const response = await axios.get(
          `${apiJobDetails}/item/${item}.json`
        );

        return response.data;
      });

      const jobDetails = await Promise.all(newDetails);

      const allCards = [...data, ...jobDetails];
      setData(allCards);
    } catch (err) {
      console.error(err, "Error occurred while fetching job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiIdDetails();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#ff6600", marginBottom: "20px",textAlign:"center" }}>
        Hacker News Jobs Board
      </h2>
      {loading ? (
      <LoadingSpinner/>
      ) : (
        data.map((job, index) => (
          <div
            key={job.id || index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px 15px",
              marginBottom: "15px",
              backgroundColor: "#fdfdfd",
              textAlign:"center",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontWeight: "bold", margin: "0" }}>
              {job.title || "Job Title Unavailable"}
            </p>
            <p style={{ color: "#777", fontSize: "14px", margin: "5px 0 0" }}>
              By {job.by || "Unknown"} -{" "}
              {new Date(job.time * 1000).toLocaleString()}
            </p>
          </div>
        ))
      )}
    
      <div style={{ textAlign: "center", marginTop: "20px" }}>
  <button
    onClick={() => loadObjects(6, 6)}
    style={{
      backgroundColor: "#ff6600",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
    onMouseOver={(e) => {
      e.target.style.transform = "scale(1.05)";
      e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
    }}
    onMouseOut={(e) => {
      e.target.style.transform = "scale(1)";
      e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    }}
  >
    Load More
  </button>
</div>
    </div>
  );
};

export default JobsBoard;
