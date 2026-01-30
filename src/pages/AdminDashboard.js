// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { Outlet } from "react-router-dom";

// const AdminDashboard = () => {
//   return <h1 className="page-title">Admin Dashboard</h1>;
// };

// export default AdminDashboard;
import React from "react";
import "../styles/Admindashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard">

      {/* Top Cards */}
      <div className="cards">

        <div className="card">
          <h4>Students</h4>
          <h2>150000</h2>
        </div>

        <div className="card">
          <h4>Teachers</h4>
          <h2>2250</h2>
        </div>

        <div className="card">
          <h4>Parents</h4>
          <h2>5690</h2>
        </div>

        <div className="card">
          <h4>Earnings</h4>
          <h2>$193000</h2>
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
              <h2>$75,000</h2>
            </div>

            <div className="info-item">
              <span className="dot red"></span>
              <p>Fees Collection</p>
              <h2>$15,000</h2>
            </div>

          </div>


          {/* Fake Chart */}
          <div className="chart-area">
            <div className="chart blue"></div>
            <div className="chart red"></div>
          </div>

        </div>


        {/* Expenses */}
        <div className="box">

          <h3>Expenses</h3>

          <div className="bars">
            <div className="bar green"></div>
            <div className="bar blue"></div>
            <div className="bar orange"></div>
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
              <p>Female: 45,000</p>
            </div>

            <div className="legend-item">
              <span className="line orange"></span>
              <p>Male: 1,05,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
