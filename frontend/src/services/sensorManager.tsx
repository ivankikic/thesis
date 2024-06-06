import { useEffect } from "react";
import { Sensor } from "../utils/types";
import { parse } from "papaparse";
import axiosClient from "../auth/apiClient";
import throttle from "lodash/throttle";

const SensorManager = () => {
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

  const sendSensorData = async (sheetId: number, data: any) => {
    const response = await axiosClient.post(
      `/api/sheets/${sheetId}/insert-row`,
      data
    );
    return response.data;
  };

  useEffect(() => {
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
            await sendSensorData(sensor.sheet_id, row);
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
