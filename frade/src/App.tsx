import React from "react";

import { Routes, Link, Route } from "react-router-dom";

import { Layout, Typography, Space } from "antd";
import { Homepage, Navbar, Exchanges, Cryptocurrencies, CryptoDetails, News } from "./components";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <header className="navbar">
        <Navbar />
      </header>
      <main className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <footer className="footer">
          <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
            Frade, The Friend of Trades
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchages">Exchages</Link>
            <Link to="/news">News</Link>
          </Space>
        </footer>
      </main>
    </div>
  );
};

export default App;
