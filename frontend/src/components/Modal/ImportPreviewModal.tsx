import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ImportColumns, ModalButton } from "./ModalStyles";
import { Input } from "./ModalStyles";
import "../../assets/ImportPreviewModal.css";
import InfoIcon from "/icons/pages/info.svg";
import { isSheetNameAlreadyTaken } from "../../services/sheetService";

interface ImportPreviewModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (name: string, columns: string[], rows: any[]) => void;
  initialName: string;
  initialColumns: string[];
  initialRows: [][];
  rowCount: number;
}

const ImportPreviewModal: React.FC<ImportPreviewModalProps> = ({
  show,
  handleClose,
  handleConfirm,
  initialName,
  initialColumns,
  initialRows,
  rowCount,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState(initialName);
  const [columns, setColumns] = useState(initialColumns);
  const [rows, _] = useState(initialRows);
  const [nameError, setNameError] = useState(false);

  const handleColumnChange = (index: number, newValue: string) => {
    const newColumns = [...columns];
    newColumns[index] = newValue;
    setColumns(newColumns);
  };

  const handleConfirmCheck = async () => {
    const isNameAlreadyTaken = await isSheetNameAlreadyTaken(name);
    if (isNameAlreadyTaken) {
      setNameError(true);
    } else {
      setNameError(false);
      handleConfirm(name, columns, rows);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header>
        <Modal.Title>{t("IMPORT_PREVIEW")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>{t("FILE_NAME")}:</label>
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
            <div className="error-message">
              {t("ERROR_NAME_ALREADY_TAKEN", { name })}
            </div>
          )}
        </div>
        <div className="column-names-group">
          <label>{t("COLUMN_NAMES")}:</label>
          <ImportColumns>
            {columns.map((column, index) => (
              <Input
                key={index}
                type="text"
                value={column}
                onChange={(e) => handleColumnChange(index, e.target.value)}
                className={
                  column === "unknown" || column === null || column === ""
                    ? "column-name-input missing"
                    : "column-name-input"
                }
              />
            ))}
          </ImportColumns>
        </div>
        <div className="info">
          <img src={InfoIcon} alt="info" />
          <span>{t("COLUMN_NAMES_INFO")}</span>
        </div>
        <label>
          {t("ROW_COUNT")}: {rowCount}
        </label>
      </Modal.Body>
      <Modal.Footer>
        <ModalButton variant="secondary" onClick={handleClose}>
          {t("CANCEL")}
        </ModalButton>
        <ModalButton variant="primary" onClick={handleConfirmCheck}>
          {t("IMPORT")}
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportPreviewModal;
