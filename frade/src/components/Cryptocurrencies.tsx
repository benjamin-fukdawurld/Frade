import React, { ReactElement, useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

interface Props {
  simplified?: boolean;
}

export default function Cryptocurrencies({ simplified }: Props): ReactElement {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setCryptos(
      cryptosList?.data?.coins.filter((coin: any) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency: any, index: number) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={`${index} · ${currency.uuid}`}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank} · ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />}
              >
                <p>Price: $ {millify(currency.price)}</p>
                <p>Market Cap: $ {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
