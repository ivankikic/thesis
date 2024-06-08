import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ColumnButton, ColumnButtonContainer } from "./ModalStyles";

interface EditColumnsModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  columns: string[];
  selectedColumns: string[];
  toggleColumn: (column: string) => void;
}

const EditColumnsModal: React.FC<EditColumnsModalProps> = ({
  show,
  handleClose,
  handleConfirm,
  columns,
  selectedColumns,
  toggleColumn,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{t("EDIT_COLUMNS")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ColumnButtonContainer>
          {columns.map((col) => (
            <ColumnButton
              key={col}
              selected={selectedColumns.includes(col)}
              onClick={() => toggleColumn(col)}
            >
              <label>{col}</label>
            </ColumnButton>
          ))}
        </ColumnButtonContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("CANCEL")}
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {t("CONFIRM")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditColumnsModal;
