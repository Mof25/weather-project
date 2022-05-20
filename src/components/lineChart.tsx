import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { dateFormatter } from "./helpers.tsx";

export const SeparateLineChart = ({ data }): React.FC => {
  const getSerieMeasurment = () => {
    const res = [];
    data.stationData.map((elem) => {
      const index = res.findIndex(
        (el) =>
          dateFormatter(el.date, "DD-MM-YYYY") ===
          dateFormatter(elem.date, "DD-MM-YYYY")
      );
      if (index !== -1) {
        res[index].data.push(
          { category: "pressure", value: elem.pressure },
          { category: "windSpeed", value: elem.windSpeed },
          { category: "temperature", value: elem.temperature },
          { category: "humidity", value: elem.humidity }
        );
      } else {
        res.push({
          date: dateFormatter(elem.date, "DD-MM"),
          data: [
            { category: "pressure", value: elem.pressure },
            { category: "windSpeed", value: elem.windSpeed },
            { category: "temperature", value: elem.temperature },
            { category: "humidity", value: elem.humidity },
          ],
        });
      }
    });

    return res;
  };

  return (
    <>
      <LineChart width={500} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" type="category" />
        <YAxis dataKey="value" />
        <Tooltip />
        {getSerieMeasurment().map((s) => (
          <Line dataKey="value" data={s.data} name={s.date} key={s.date} />
        ))}
      </LineChart>
    </>
  );
};
