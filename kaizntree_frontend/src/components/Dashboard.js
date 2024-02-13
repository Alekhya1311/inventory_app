// DashboardPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://18.222.150.88:8000/api/items/dashboard", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setItems(response.data.results);
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
        })
        .catch((error) => {
          console.error("Error fetching dashboard items:", error);
        });
    }
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      axios
        .get(nextPage, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setItems(response.data.results);
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
        })
        .catch((error) => {
          console.error("Error fetching next page items:", error);
        });
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      axios
        .get(previousPage, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setItems(response.data.results);
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
        })
        .catch((error) => {
          console.error("Error fetching previous page items:", error);
        });
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://127.0.0.1:8000/api/logout/", null, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          localStorage.removeItem("token");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-actions">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2 className="dashboard-header">Dashboard</h2>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Stock Status</th>
            <th>Available Stock</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.sku} className="dashboard-row">
              <td>{item.sku}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.tags.join(", ")}</td>
              <td>{item.stock_status}</td>
              <td>{item.available_stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dashboard-pagination">
        {previousPage && (
          <button
            className="dashboard-pagination-button"
            onClick={handlePreviousPage}
          >
            Previous
          </button>
        )}
        {nextPage && (
          <button
            className="dashboard-pagination-button"
            onClick={handleNextPage}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
