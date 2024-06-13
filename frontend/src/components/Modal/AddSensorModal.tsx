import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ModalButton,
  Select,
  Input,
  ImportColumns,
  ColumnBar,
  InfoContent,
  Spacer,
} from "./ModalStyles";
import "../../assets/ImportPreviewModal.css";
import { SensorSource } from "../../utils/types";
import InfoIcon from "/icons/pages/info_b.svg";
import { useSidebar } from "../../contexts/SidebarContext";

interface AddSensorModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (
    name: string,
    file_name: string,
    location: string,
    sheet_name: string,
    columns: string[]
  ) => void;
  sensorSources: SensorSource[];
}

const AddSensorModal: React.FC<AddSensorModalProps> = ({
  show,
  handleClose,
  handleSubmit,
  sensorSources,
}) => {
  const { t } = useTranslation();
  const { sheets } = useSidebar();
  const [name, setName] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [sensorSource, setSensorSource] = useState(sensorSources[0].file_name);
  const [location, setLocation] = useState("");
  const [nameError, setNameError] = useState(false);
  const [sheetNameError, setSheetNameError] = useState(false);
  const [columnInput, setColumnInput] = useState("");

  const handleFormSubmit = () => {
    if (name === null || name === "") {
      setNameError(true);
      return;
    }
    if (sheets.find((sheet) => sheet.name === sheetName)) {
      setSheetNameError(true);
      return;
    }
    handleSubmit(name, sensorSource, location, sheetName, columns);
  };

  const handleAddColumn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && columnInput.trim() !== "") {
      setColumns([...columns, columnInput.trim()]);
      setColumnInput("");
    }
  };

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header>
        <Modal.Title>{t("ADD_SENSOR")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>{t("SENSOR_NAME")}:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
            }}
            className={nameError ? "input-error" : ""}
          />
          {nameError && (
            <div className="error-message">{t("ERROR_NAME_REQUIRED")}</div>
          )}
        </div>
        <Spacer />
        <div>
          <label>{t("SHEET_NAME")}:</label>
          <Input
            type="text"
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            className={sheetNameError ? "input-error" : ""}
          />
          {sheetNameError && (
            <div className="error-message">
              {t("ERROR_NAME_ALREADY_TAKEN", { name: sheetName })}
            </div>
          )}
        </div>
        <Spacer />
        <div>
          <label>{t("COLUMNS_INPUT")}:</label>
          <Input
            type="text"
            value={columnInput}
            onChange={(e) => setColumnInput(e.target.value)}
            onKeyDown={handleAddColumn}
          />
          <ImportColumns>
            {columns.map((column, index) => (
              <ColumnBar key={index}>
                {column}
                <span
                  onClick={() => handleRemoveColumn(index)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "0",
                    transform: "translateY(-50%)",
                    paddingRight: "10px",
                    cursor: "pointer",
                    color: "#333",
                    borderRadius: "50%",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  X
                </span>
              </ColumnBar>
            ))}
          </ImportColumns>

          <InfoContent>
            <img src={InfoIcon} alt="info" />
            <span>{t("INFO_COLUMNS")}</span>
          </InfoContent>
        </div>
        <div>
          <label>{t("SENSOR_SOURCE")}:</label>
          <Select
            value={sensorSource}
            onChange={(e) => {
              setSensorSource(e.target.value);
            }}
          >
            {sensorSources.map((sensorSource) => (
              <option
                key={sensorSource.id}
                value={sensorSource.file_name}
                onClick={() => setSensorSource(sensorSource.file_name)}
              >
                {sensorSource.name}
              </option>
            ))}
          </Select>
        </div>
        <Spacer />
        <div>
          <label>{t("LOCATION")}:</label>
          <Input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ModalButton variant="secondary" onClick={handleClose}>
          {t("CANCEL")}
        </ModalButton>
        <ModalButton variant="primary" onClick={handleFormSubmit}>
          {t("ADD")}
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSensorModal;
