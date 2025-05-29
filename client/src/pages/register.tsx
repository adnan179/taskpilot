import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
import { registerSchema } from "../schemas/registerSchema";
import { zodValidator } from "@tanstack/zod-form-adapter";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues:{
      username:"",
      password:""
    },
    onSubmit: async ({ value }) => {
      await register(value.username, value.password);
      navigate("/")
    },
    validator:zodValidator(registerSchema),
    
  })

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={(e) => {
          e.preventDefault();
          const isValid = form.handleSubmit();
          if(!isValid) return;
        }}
        className="flex flex-col gap-3 justify-center items-center p-10 bg-gray-50 rounded-[36px] shadow-lg"
      >
        <h2 className="text-blue-500 text-[24px] font-semibold">Register</h2>
        <form.Field name="username">
          {(field) => (
            <div className="w-full">
              <input required
                placeholder="Username"
                type="text"
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
                placeholder="Password"
                type="password"
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
        <button type="submit" className="flex px-4 py-2 text-[16px] text-white font-medium bg-blue-500 shadow rounded-md">Register</button>
        <button onClick={() => navigate("/login")} className="text-blue-400 font-medium cursor-pointer">Returning user?</button>
      </form>
    </section>
    
  );
}
