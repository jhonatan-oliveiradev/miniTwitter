import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"
  />
);

const validationSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("Digite seu e-mail"),
  password: yup.string().required("Digite sua senha"),
});

export function Login({ signInUser }) {
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.get("http://localhost:3001/login", {
        auth: {
          username: values.email,
          password: values.password,
        },
      });

      signInUser(res.data);
    },
    initialValues: {
      email: "",
      password: "",
    },
    validateOnMount: true,
    validationSchema,
  });

  return (
    <div className="h-full flex flex-col justify-center p-12 space-y-6">
      <h1 className="text-3xl">Acesse sua conta</h1>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="space-y-2">
          <Input
            type="text"
            name="email"
            placeholder="Nome de usuário ou e-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <span className="text-sm text-silver text-center">
        Não tem uma conta?{" "}
        <a className="text-birdBlue" href="#">
          Inscreva-se
        </a>
      </span>
    </div>
  );
}
