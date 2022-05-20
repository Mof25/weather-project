import React, { useState } from "react";
import { Divider, Table, Modal, Button } from "antd";
import {
  StationDataContainer,
  Header,
  DataText,
  DataTitle,
  Title,
} from "./../station.ts";
import { HistogramChart } from "./histogramChart.tsx";
import { SeparateLineChart } from "./lineChart.tsx";

const StationCard = ({ data }): React.FC => {
  const { stationName, stationData } = data;
  const lastData = stationData[stationData.length - 1];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const switchChart = () => {
    setShowCharts(!showCharts);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "Date",
      align: "center",
    },
    {
      title: "Temperature",
      dataIndex: "temperature",
      key: "Temperature",
      align: "center",
    },
    {
      title: "Wind Speed",
      dataIndex: "windSpeed",
      key: "Wind Speed",
      align: "center",
    },
    {
      title: "Pressure",
      key: "Pressure",
      dataIndex: "pressure",
      align: "center",
    },
    {
      title: "Humidity",
      key: "Humidity",
      dataIndex: "humidity",
      align: "center",
    },
  ];

  return (
    <>
      <Header>
        <Title fontSize={"38px"}>{stationName}</Title>
      </Header>
      <DataTitle fontSize={"30px"} margin={"0 0 5px 0"} fontWeight={"600"}>
        Date: {lastData.date}
      </DataTitle>
      <StationDataContainer>
        <DataTitle>
          Temperature: <DataText>{lastData.temperature}&deg;C</DataText>
        </DataTitle>
        <DataTitle>
          Wind Speed: <DataText>{`${lastData.windSpeed} km/h`}</DataText>
        </DataTitle>
        <DataTitle>
          Pressure: <DataText>{lastData.pressure}</DataText>
        </DataTitle>
        <DataTitle>
          Humidity: <DataText>{lastData.humidity}</DataText>
        </DataTitle>
      </StationDataContainer>
      <Divider orientation="left">
        <DataTitle level={3}>Last 5 records</DataTitle>
      </Divider>
      <Table
        columns={columns}
        dataSource={stationData.slice(Math.max(stationData.length - 5, 0))}
        pagination={false}
        rowKey="date"
      />
      <Button
        type="primary"
        onClick={showModal}
        style={{ margin: "20px 0 0 10px", borderRadius: "10px" }}
      >
        Show More
      </Button>
      <Modal
        title="Full Data"
        visible={isModalVisible}
        onOk={switchChart}
        onCancel={handleCancel}
        okText={showCharts ? "Switch to data" : "Switch to charts"}
        width={1000}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {showCharts ? (
          <>
            <HistogramChart data={data} />
            <Divider />
            <SeparateLineChart data={data} />
          </>
        ) : (
          <Table
            columns={columns}
            dataSource={stationData}
            pagination={{ pageSize: 10 }}
            rowKey="date"
          />
        )}
      </Modal>
    </>
  );
};

export default StationCard;
