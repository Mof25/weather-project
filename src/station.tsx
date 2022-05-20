import React from "react";
import { MainContainer, CardContainer, Card } from "./station.ts";
import { Row, Col } from "antd";
import res from "./data.json";
import "antd/dist/antd.min.css";
import StationCard from "./components/stationCard.tsx";

const Station = (): React.FC => {
  return (
    <MainContainer>
      <CardContainer>
        <Row gutter={[24, 48]}>
          {res.data.map((station, index) => (
            <Col
              sm={{ span: 24 }}
              md={{ span: 20 }}
              lg={{ span: 16 }}
              xl={{ span: 14 }}
              xxl={{ span: 12 }}
              key={index}
            >
              <Card>
                <StationCard data={station} />
              </Card>
            </Col>
          ))}
        </Row>
      </CardContainer>
    </MainContainer>
  );
};

export default Station;
