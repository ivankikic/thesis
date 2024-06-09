import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ModalButton,
  Input,
  Spacer,
  CustomSelectContainer,
  CustomSelectInput,
  CustomSelectDropdown,
  CustomSelectOption,
  ColumnsContainer,
} from "./ModalStyles";
import "../../assets/ImportPreviewModal.css";
import { useSidebar } from "../../contexts/SidebarContext";

interface AddReportModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (
    name: string,
    sheet_id: number | null,
    columns: string[],
    rows: any[],
    interval_type: string,
    file_name: string
  ) => void;
}

const AddReportModal: React.FC<AddReportModalProps> = ({
  show,
  handleClose,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const { sheets, reloadSheets } = useSidebar();
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("");
  const [sheetId, setSheetId] = useState<number | null>(null);
  const [nameError, setNameError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sheetDropdownOpen, setSheetDropdownOpen] = useState(false);
  const [intervalDropdownOpen, setIntervalDropdownOpen] = useState(false);
  const [intervalType, setIntervalType] = useState("daily");
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const resetForm = () => {
    setName("");
    setFileName("");
    setSheetId(null);
    setNameError(false);
    setSearchTerm("");
    setSheetDropdownOpen(false);
    setIntervalDropdownOpen(false);
    setIntervalType("daily");
    setColumns([]);
    setSelectedColumns([]);
    setRows([]);
  };

  const handleFormSubmit = () => {
    if (name === null || name === "") {
      setNameError(true);
      return;
    }

    handleSubmit(name, sheetId, selectedColumns, rows, intervalType, fileName);
    resetForm();
  };

  const handleModalClose = () => {
    handleClose();
    //resetForm();
  };

  const filteredSheets = sheets.filter((sheet) =>
    sheet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (
    id: number,
    name: string,
    columns: string[],
    rows: any[]
  ) => {
    setSheetId(id);
    setSearchTerm(name);
    setColumns(columns);
    setSelectedColumns(columns);
    setRows(rows);
    setSheetDropdownOpen(false);
  };

  const handleColumnSelect = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  useEffect(() => {
    reloadSheets();
  }, []);

  const intervalOptions = [
    { value: "daily", label: t("DAILY") },
    { value: "weekly", label: t("WEEKLY") },
    { value: "monthly", label: t("MONTHLY") },
    { value: "quartaly", label: t("QUARTALY") },
    { value: "yearly", label: t("YEARLY") },
  ];

  return (
    <Modal show={show} onHide={handleModalClose} dialogClassName="custom-modal">
      <Modal.Header>
        <Modal.Title>{t("ADD_REPORT")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>{t("REPORT_NAME")}:</label>
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
          <label>{t("FILE_NAME")}:</label>
          <Input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <Spacer />
        <div className="d-flex gap-2">
          <label>{t("INTERVAL_TYPE")}:</label>
          <CustomSelectContainer>
            <CustomSelectInput
              type="text"
              value={
                intervalOptions.find((option) => option.value === intervalType)
                  ?.label || ""
              }
              readOnly
              onClick={() => setIntervalDropdownOpen(!intervalDropdownOpen)}
            />
            {intervalDropdownOpen && (
              <CustomSelectDropdown>
                {intervalOptions.map((option) => (
                  <CustomSelectOption
                    key={option.value}
                    onClick={() => {
                      setIntervalType(option.value);
                      setIntervalDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </CustomSelectOption>
                ))}
              </CustomSelectDropdown>
            )}
          </CustomSelectContainer>
        </div>
        <Spacer />
        <div className="d-flex gap-2">
          <label>{t("SELECT_SHEET")}:</label>
          <CustomSelectContainer>
            <CustomSelectInput
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSheetDropdownOpen(true);
              }}
              onClick={() => setSheetDropdownOpen(!sheetDropdownOpen)}
            />
            {sheetDropdownOpen && (
              <CustomSelectDropdown>
                {filteredSheets.map((sheet) => (
                  <CustomSelectOption
                    key={sheet.id}
                    onClick={() =>
                      handleSelect(
                        sheet.id,
                        sheet.name,
                        sheet.columns,
                        sheet.rows
                      )
                    }
                  >
                    {sheet.name}
                  </CustomSelectOption>
                ))}
              </CustomSelectDropdown>
            )}
          </CustomSelectContainer>
        </div>
        <Spacer />
        {columns.length > 0 && (
          <div>
            <label>{t("COLUMNS")}:</label>
            <ColumnsContainer>
              {columns.map((column) => (
                <div key={column} style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column)}
                    onChange={() => handleColumnSelect(column)}
                  />
                  {column}
                </div>
              ))}
            </ColumnsContainer>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <ModalButton variant="secondary" onClick={handleModalClose}>
          {t("CANCEL")}
        </ModalButton>
        <ModalButton variant="primary" onClick={handleFormSubmit}>
          {t("ADD")}
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReportModal;
