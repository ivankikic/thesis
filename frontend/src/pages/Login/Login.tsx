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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email je obavezan"),
    password: Yup.string().required("Lozinka je obavezna"),
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
        toast.success("Uspješno ste se prijavili!", { duration: 1500 });
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
          <Form.Label>Email:</Form.Label>
          <FormControl
            type="email"
            name="email"
            placeholder="Vaš email"
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
          <Form.Label>Lozinka:</Form.Label>
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
          Prijavi se
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default Login;
