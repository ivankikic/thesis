import express from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateEmailContent = ({
  sensor_name,
  alert_type,
  target_value,
  actual_value,
  attribute_name,
}) => {
  return `
    Alert Notification

    Sensor: ${sensor_name}
    Sensor has received data that hit your ${
      alert_type === "lower" ? "lower" : "upper"
    } limit in the ${attribute_name} column. 
    Your set threshold value is ${target_value}, and the sensor recorded ${actual_value}.

    Please take the necessary actions.
  `;
};

router.post("/send-email", async (req, res) => {
  const {
    to,
    sensor_name,
    alert_type,
    target_value,
    actual_value,
    attribute_name,
  } = req.body;

  const msg = {
    to,
    from: "info@farmsense.tech",
    subject: "Farmsense - Alert Notification",
    text: generateEmailContent({
      sensor_name,
      alert_type,
      target_value,
      actual_value,
      attribute_name,
    }),
  };

  try {
    await sgMail.send(msg);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to send email" });
  }
});

export default router;
