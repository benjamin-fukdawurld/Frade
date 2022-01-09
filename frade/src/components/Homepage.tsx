import React, { ReactElement } from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import millify from "millify";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

interface Props {}

const { Title } = Typography;

export default function Homepage({}: Props): ReactElement {
  const { data, isFetching } = useGetCryptosQuery(10);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const globalStats = data?.data?.stats;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={`$ ${globalStats?.total ?? "N / A"}`} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={`$ ${millify(globalStats?.totalExchanges ?? "N / A")}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={`$ ${millify(globalStats?.totalMarketCap ?? "N / A")}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={`$ ${millify(globalStats?.total24hVolume ?? "N / A")}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={`$ ${millify(globalStats?.totalMarkets ?? "N / A")}`}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}
