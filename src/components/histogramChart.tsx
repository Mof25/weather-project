import React, { useState, useEffect } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
} from "recharts";
import moment from "moment";
import { Select } from "antd";
import { Label } from "./../station.ts";
import { dateFormatter } from "./helpers.tsx";

const { Option } = Select;

export const HistogramChart = ({ data }): React.FC => {
  const [graphData, setGraphData] = useState([]);
  const [measurement, setMeasurement] = useState("temperature");

  const listYears = Array.from(
    new Set(data.stationData.map((elem) => dateFormatter(elem.date, "YYYY")))
  );

  const [listYear, setListYear] = useState(listYears[0]);

  const getAmPmMeasurment = () => {
    const res = [];
    data.stationData.map((elem) => {
      const index = res.findIndex(
        (el) =>
          dateFormatter(el.date, "DD-MM-YYYY") ===
          dateFormatter(elem.date, "DD-MM-YYYY")
      );

      if (index !== -1) {
        if (dateFormatter(elem.date, "A") === "AM") {
          res[index].amMeasurement = elem[measurement];
        } else {
          res[index].pmMeasurement = elem[measurement];
        }
      } else {
        if (dateFormatter(elem.date, "A") === "AM") {
          res.push({
            amMeasurement: elem[measurement],
            date: dateFormatter(elem.date, "DD-MM-YYYY"),
          });
        } else {
          res.push({
            pmMeasurement: elem[measurement],
            date: dateFormatter(elem.date, "DD-MM-YYYY"),
          });
        }
      }
    });

    return res;
  };

  const getAvaragePerMonth = () => {
    const selectedYearData = getAmPmMeasurment().filter(
      (elem) => dateFormatter(elem.date, "YYYY") === listYear
    );

    const dataPerMonth = moment.monthsShort().map((month) => {
      return selectedYearData.filter(
        (selectedYear) => dateFormatter(selectedYear.date, "MMM") === month
      );
    });

    dataPerMonth.map((month) => {
      const amData = month.map((monthData) => {
        return monthData.amMeasurement;
      });

      const pmData = month.map((monthData) => {
        return monthData.pmMeasurement;
      });
      const avgAmData = amData.reduce((a, b) => a + b, 0) / amData.length || 0;
      const avgPmData = pmData.reduce((a, b) => a + b, 0) / pmData.length || 0;

      setGraphData((prevGraphData) => [
        ...prevGraphData,
        {
          month: dateFormatter(month[0]?.date, "MMM"),
          avgAmData: avgAmData,
          avgPmData: avgPmData,
        },
      ]);
    });
  };

  useEffect(() => {
    setGraphData([]);
    getAvaragePerMonth();
  }, [listYear, measurement]);

  return (
    <>
      <Label margin={"0 5px 0 45px"}>Choose Year:</Label>
      <Select
        defaultValue={listYears[0]}
        style={{ width: 120 }}
        onChange={(value) => setListYear(value)}
        style={{ margin: "5px 0 15px 0" }}
      >
        {listYears.map((year, index) => {
          return (
            <Option value={year} key={index}>
              {year}
            </Option>
          );
        })}
      </Select>
      <Label margin={"0 5px 0 20px"}>Choose Measurement:</Label>
      <Select
        defaultValue="temperature"
        style={{ width: 120 }}
        onChange={(value) => setMeasurement(value)}
        style={{ margin: "5px 0 15px 10px" }}
      >
        <Option value="pressure">Pressure</Option>
        <Option value="humidity">Humidity</Option>
        <Option value="temperature">Temperature</Option>
        <Option value="windSpeed">WindSpeed</Option>
      </Select>
      <BarChart width={730} height={250} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avgAmData" name="AM" fill="#8884d8" />
        <Bar dataKey="avgPmData" name="PM" fill="#82ca9d" />
      </BarChart>
    </>
  );
};
