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
} from "./ModalStyles";
import "../../assets/ImportPreviewModal.css";
import { useSidebar } from "../../contexts/SidebarContext";

interface AddDashboardTileModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (name: string, sheet_id: number | null) => void;
}

const AddDashboardTileModal: React.FC<AddDashboardTileModalProps> = ({
  show,
  handleClose,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const { sheets, reloadSheets } = useSidebar();
  const [name, setName] = useState("");
  const [sheetId, setSheetId] = useState<number | null>(null);
  const [nameError, setNameError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFormSubmit = () => {
    if (name === null || name === "") {
      setNameError(true);
      return;
    }

    handleSubmit(name, sheetId);
  };

  const filteredSheets = sheets.filter((sheet) =>
    sheet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (id: number, name: string) => {
    setSheetId(id);
    setSearchTerm(name);
    setDropdownOpen(false);
  };

  useEffect(() => {
    reloadSheets();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header>
        <Modal.Title>{t("ADD_TILE")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>{t("DASHBOARD_TILE_NAME")}:</label>
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
        <div className="d-flex gap-2">
          <label>{t("SELECT_SHEET")}:</label>
          <CustomSelectContainer>
            <CustomSelectInput
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setDropdownOpen(true);
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <CustomSelectDropdown>
                {filteredSheets.map((sheet) => (
                  <CustomSelectOption
                    key={sheet.id}
                    onClick={() => handleSelect(sheet.id, sheet.name)}
                  >
                    {sheet.name}
                  </CustomSelectOption>
                ))}
              </CustomSelectDropdown>
            )}
          </CustomSelectContainer>
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

export default AddDashboardTileModal;
