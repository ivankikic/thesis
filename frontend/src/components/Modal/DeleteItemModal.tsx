import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface ConfirmDeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  show,
  handleClose,
  handleConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{t("CONFIRMATION")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("CONFIRM_DELETE_SHEET")}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("CANCEL")}
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          {t("CONFIRM")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
