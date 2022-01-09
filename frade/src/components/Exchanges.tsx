import React, { ReactElement } from "react";
import { Row, Col, Collapse, Typography } from "antd";
import { useGetExchangesQuery } from "../services/cryptoApi";

interface Props {}

const { Title, Text } = Typography;

export default function Exchanges({}: Props): ReactElement {
  const { data, isFetching } = useGetExchangesQuery(50);

  const headers = ["Exchanges", "24h Trade Volume", "Markets", "Change"];

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Col>
        <Row>
          {headers.map((header: string) => (
            <Col span={6}>
              <Title level={5}>{header}</Title>
            </Col>
          ))}
        </Row>
        {data.exchanges?.map((exchange: any) => {
          return (
            <Row>
              <Collapse>
                <Col span={6}>
                  <Text style={{ fontWeight: 700 }}>
                    {exchange.rank} · {exchange.name}
                  </Text>
                </Col>
              </Collapse>
            </Row>
          );
        })}
      </Col>
    </>
  );
}
