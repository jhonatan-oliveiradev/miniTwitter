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
  name: yup.string().required("Digite seu nome"),
  username: yup.string().required("Digite um nome de usuário"),
  email: yup.string().email("E-mail inválido").required("Digite seu e-mail"),
  password: yup.string().required("Digite sua senha"),
});

export function Signup({ signInUser }) {
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.post("http://localhost:9901/signup", {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
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
      <h1 className="text-3xl">Crie sua conta</h1>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="space-y-2">
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="text"
            name="email"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
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
          {formik.isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <span className="text-sm text-silver text-center">
        Possui uma conta? <a className="text-birdBlue" href="/login">Faça login</a>.
      </span>
    </div>
  );
}
