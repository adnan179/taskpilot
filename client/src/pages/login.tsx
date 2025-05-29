import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { loginSchema } from "../schemas/loginSchema";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await login(value.username, value.password);
      navigate("/");
    },
    validator:zodValidator(loginSchema),
  });

  return (
    <section className="flex w-full min-h-screen justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="bg-gray-50 rounded-lg p-10 shadow-lg flex flex-col gap-3 justify-center items-center"
      >
        <h2 className="text-blue-500 text-[24px] font-semibold">Login</h2>

        <form.Field name="username">
          {(field) => (
            <div className="w-full">
              <input required
                type="text"
                placeholder="Username"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="p-4 sm:w-[350px] w-full rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {field.state.meta.errors?.[0] && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="w-full">
              <input required
                type="password"
                placeholder="Password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="p-4 sm:w-[350px] w-full rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {field.state.meta.errors?.[0] && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {form.state.isSubmitting && (
          <p className="text-sm text-gray-500">Logging in...</p>
        )}

        <button
          type="submit"
          className="flex px-4 py-2 bg-blue-500 text-white font-medium shadow-md rounded-lg"
        >
          Login
        </button>
        <button className="text-blue-400 text-lg font-medium cursor-pointer" onClick={() => navigate("/register")}>New User?</button>
      </form>
    </section>
  );
}
