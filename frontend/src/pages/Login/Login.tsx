import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginContainer, LoginTitle } from "./LoginStyles";
import FarmsenseLogo from "/big_logo.svg";
import { Button } from "../../components/Button";
import { useAuthContext } from "../../auth/AuthProvider";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string().required(t("EMAIL_REQUIRED")),
    password: Yup.string().required(t("PASSWORD_REQUIRED")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate("/");
        toast.success(t("TOAST_SUCCESS_LOGIN"), { duration: 1500 });
      } catch (error) {
        toast.error(error as string, { duration: 1500 });
      }
    },
  });

  return (
    <LoginContainer>
      <LoginTitle>
        <img src={FarmsenseLogo} alt="Farmsense Logo" />
      </LoginTitle>
      <Form noValidate onSubmit={formik.handleSubmit} style={{ width: "35%" }}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>{t("EMAIL")}:</Form.Label>
          <FormControl
            type="email"
            name="email"
            placeholder={t("YOUR_EMAIL")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>{t("PASSWORD")}:</Form.Label>
          <FormControl
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          width={0}
          height={40}
        >
          {t("LOGIN")}
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default Login;
