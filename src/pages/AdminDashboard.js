import React, { useEffect, useState } from "react";
import "../styles/Admindashboard.css";
import api from "../services/api";

const AdminDashboard = () => {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const res = await api.get("/admin/dashboard", {
        params: {
          startDate: "2025-01-01",
          endDate: "2025-06-30",
          schoolId: 1
        }
      });

      setDashboard(res.data);
      setLoading(false);

    } catch (err) {
      console.log(err);
      setError("Failed to load dashboard");
      setLoading(false);
    }
  };


  if (loading) return <h2>Loading Dashboard...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="dashboard">

      {/* Top Cards */}
      <div className="cards">

        <div className="card">
          <h4>Students</h4>
          <h2>{dashboard.stats.students}</h2>
        </div>

        <div className="card">
          <h4>Teachers</h4>
          <h2>{dashboard.stats.teachers}</h2>
        </div>

        <div className="card">
          <h4>Parents</h4>
          <h2>{dashboard.stats.parents}</h2>
        </div>

        <div className="card">
          <h4>Earnings</h4>
          <h2>₹ {dashboard.stats.earnings}</h2>
        </div>

      </div>


      {/* Dashboard Body */}
      <div className="main-section">

        {/* Earnings Section */}
        <div className="box large">

          <h3>Earnings</h3>

          <div className="earning-info">

            <div className="info-item">
              <span className="dot blue"></span>
              <p>Total Collection</p>
              <h2>
                ₹ {dashboard.earnings.reduce(
                  (sum, e) => sum + e.totalCollection,
                  0
                )}
              </h2>
            </div>

            <div className="info-item">
              <span className="dot red"></span>
              <p>Fees Collection</p>
              <h2>
                ₹ {dashboard.earnings.reduce(
                  (sum, e) => sum + e.totalFees,
                  0
                )}
              </h2>
            </div>

          </div>


          {/* Fake Chart (Next: Real Chart) */}
          <div className="chart-area">
            <div className="chart blue"></div>
            <div className="chart red"></div>
          </div>

        </div>


        {/* Expenses */}
        <div className="box">

          <h3>Expenses</h3>

          <div className="bars">
            {dashboard.earnings.map((e, i) => (
              <div
                key={i}
                className="bar green"
                style={{
                  height: `${(e.totalExpense / 10000) * 100}%`
                }}
              ></div>
            ))}
          </div>

        </div>


        {/* Students */}
        <div className="box">

          <h3>Students</h3>

          <div className="circle">
            <div className="inner"></div>
          </div>


          <div className="legend">

            <div className="legend-item">
              <span className="line blue"></span>
              <p>Female: {dashboard.gender.female}</p>
            </div>

            <div className="legend-item">
              <span className="line orange"></span>
              <p>Male: {dashboard.gender.male}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
