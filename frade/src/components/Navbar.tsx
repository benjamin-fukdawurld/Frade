import React, { ReactElement, useState, useEffect, useRef } from "react";

import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

interface Props {}

export default function Navbar(props: Props): ReactElement {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number | null>(null);
  const autoClose = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize && screenSize < 768) {
      setActiveMenu(false);
      autoClose.current = true;
    } else {
      setActiveMenu(true);
      autoClose.current = false;
    }
  }, [screenSize]);

  const handleMenuItemClick = () => {
    if (!autoClose.current) {
      return;
    }

    setActiveMenu(false);
  };

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <Avatar src="/images/icon.png" size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Frade</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item key="Home" icon={<HomeOutlined />} onClick={handleMenuItemClick}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="Cryptocurrencies" icon={<FundOutlined />} onClick={handleMenuItemClick}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key="Exchanges" icon={<MoneyCollectOutlined />} onClick={handleMenuItemClick}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item key="News" icon={<BulbOutlined />} onClick={handleMenuItemClick}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </nav>
  );
}
