import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface ConfirmDeleteModalProps {
  show: boolean;
  handleClose: () => void;
  data: string;
}

const AuditLogModal: React.FC<ConfirmDeleteModalProps> = ({
  show,
  handleClose,
  data,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{t("AUDIT_LOG")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{data}</pre>
      </Modal.Body>
    </Modal>
  );
};

export default AuditLogModal;
