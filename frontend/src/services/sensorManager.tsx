import { useEffect, useState } from "react";
import { Sensor, Threshhold } from "../utils/types";
import { parse } from "papaparse";
import axiosClient from "../auth/apiClient";
import throttle from "lodash/throttle";
import dayjs from "dayjs";

const SensorManager = () => {
  const [threshholds, setThreshholds] = useState<Threshhold[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [settings, setSettings] = useState<any>({});

  const getThreshholds = async () => {
    const response = await axiosClient.get(`/api/alert-limits`);

    setThreshholds(response.data);
  };

  const getSensors = async () => {
    const response = await axiosClient.get(`/api/sensors`);
    setSensors(response.data);
  };

  const getSettings = async () => {
    const response = await axiosClient.get(`/api/settings/email`);
    setSettings(response.data);
  };

  const sendNotification = async (
    sensorId: number,
    sensor_name: string,
    alert_type: string,
    target_value: number,
    actual_value: number,
    attribute_name: string
  ) => {
    await axiosClient.post(`/api/email-notifications/send-email`, {
      to: settings[0].value,
      sensor_name,
      alert_type,
      target_value,
      actual_value,
      attribute_name,
    });

    await axiosClient.post(`/api/alert-logs`, {
      sensor_id: sensorId,
      type: alert_type,
      limit_value: Number(target_value),
      sensor_value: Number(actual_value),
      column_name: attribute_name,
    });
  };

  const fetchNextLineFromFile = async (
    sensorId: number,
    fileName: string,
    rowsCounter: number
  ) => {
    const response = await fetch(`/public/files/${fileName}`);
    const csvText = await response.text();

    return new Promise<string[]>((resolve, reject) => {
      parse(csvText, {
        complete: async (results: any) => {
          if (rowsCounter < results.data.length) {
            resolve(results.data[rowsCounter]);
            try {
              await axiosClient.put(
                `/api/sensors/${sensorId}/increment_rows_counter`
              );
            } catch (error) {
              console.error("Error incrementing rows counter:", error);
            }
          } else {
            reject(new Error("Row out of bounds"));
          }
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  };

  const sendSensorData = async (
    sensorId: number,
    sheetId: number,
    data: any
  ) => {
    const date = dayjs().format("DD.MM.YYYY. HH:mm:ss");
    data.row.unshift({ value: date });

    const response = await axiosClient.post(
      `/api/sheets/${sheetId}/insert-row`,
      data
    );
    const sensorLog = {
      sensor_id: sensorId,
      data: data,
    };
    await axiosClient.post(`/api/sensor-logs/`, sensorLog);
    return response.data;
  };

  const checkThresholds = (sensorId: number, row: any) => {
    const sensorThresholds = threshholds.find(
      (thresh) => thresh.sensor_id === sensorId
    );
    if (sensorThresholds) {
      for (let i = 0; i < row.length; i++) {
        const value = row[i].value;
        const threshold = sensorThresholds.data[i];
        if (threshold) {
          if (threshold.lower !== null && value <= threshold.lower) {
            const sensor = sensors.find((sensor) => sensor.id === sensorId);
            sendNotification(
              sensorId,
              sensor?.name || "",
              "lower",
              threshold.lower.toString(),
              value,
              threshold.column_name
            );
          } else if (threshold.upper !== null && value >= threshold.upper) {
            const sensor = sensors.find((sensor) => sensor.id === sensorId);
            sendNotification(
              sensorId,
              sensor?.name || "",
              "upper",
              threshold.upper.toString(),
              value,
              threshold.column_name
            );
          }
        }
      }
    }
    getSettings();
    getSensors();
    getThreshholds();
  };

  useEffect(() => {
    getSettings();
    getSensors();
    getThreshholds();
    const fetchAndProcessSensors = async () => {
      console.log("Fetching sensors at:", new Date().toLocaleTimeString());
      try {
        const response = await axiosClient.get("/api/sensors");
        const sensors = response.data;

        sensors.forEach(async (sensor: Sensor) => {
          if (sensor.status === "active") {
            const data = await fetchNextLineFromFile(
              sensor.id,
              sensor.file_name,
              sensor.rows_counter
            );

            const result: any[] = [];
            data.forEach((data: any) => {
              result.push({ value: data });
            });
            const row = {
              row: result,
            };

            checkThresholds(sensor.id, row.row);
            await sendSensorData(sensor.id, sensor.sheet_id, row);
          }
        });
      } catch (error) {
        console.error("Error fetching or processing sensors:", error);
      }
    };

    const throttledFetchAndProcessSensors = throttle(
      fetchAndProcessSensors,
      60000
    );

    const intervalId = setInterval(() => {
      throttledFetchAndProcessSensors();
    }, 60000); // 60000 ms = 1 minute

    fetchAndProcessSensors();

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default SensorManager;
