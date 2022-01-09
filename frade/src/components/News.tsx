import React, { ReactElement, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

interface Props {
  simplified?: boolean;
}

const { Text, Title } = Typography;

const { Option } = Select;

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

export default function News({ simplified }: Props): ReactElement {
  const [newsCategory, setNewsCategory] = useState<string>("Cryptocurrency");
  const count = simplified ? 6 : 12;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  const { data } = useGetCryptosQuery(100);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  console.log(cryptoNews.value);

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value: string) => setNewsCategory(value)}
            filterOption={(input: any, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((coin: any, index: number) => (
              <Option key={`${index} · ${coin.id}`} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value?.map((news: any, index: number) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer" title={news.name}>
              <div className="news-image-container">
                <Title level={4} className="news-title">
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt={news.name}
                />
              </div>
              <p>
                {news?.description && news.description.length > 100
                  ? `${news.description.substring(0, 97)}...`
                  : news.description ?? ""}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                    alt={news?.provider[0]?.name ?? "unknown source"}
                  />
                  <Text className="provider-name">
                    {news?.provider[0]?.name ?? "unknown source"}
                  </Text>
                </div>
                <Text>{moment(news.datePublished).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
