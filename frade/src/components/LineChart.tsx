import React, { ReactElement } from "react";
import { Col, Row, Typography } from "antd";
import { Line } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

const { Title } = Typography;

interface Props {
  coinHistory: any;
  coinName: string;
  currentPrice: string;
}

export default function LineChart({ coinHistory, coinName, currentPrice }: Props): ReactElement {
  const coinPrices = [];
  const coinTimestamps = [];

  for (let i = 0; i < coinHistory.data.history.length; ++i) {
    coinPrices.push(coinHistory.data.history[i].price);
    coinTimestamps.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamps,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrices,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Pice: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}
