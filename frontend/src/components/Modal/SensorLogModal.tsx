import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface SensorLogModalProps {
  show: boolean;
  handleClose: () => void;
  data: string;
}

const SensorLogModal: React.FC<SensorLogModalProps> = ({
  show,
  handleClose,
  data,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{t("SENSOR_LOG")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{data}</pre>
      </Modal.Body>
    </Modal>
  );
};

export default SensorLogModal;
