import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import { useForm } from '@tanstack/react-form';
import { registerSchema } from "../schemas/registerSchema";
import { toast } from 'react-toastify';


const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit:registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await register(value.username, value.password);
        toast.success(`${value.username} is registered successfully!`)
        navigate({ to: '/dashboard' });
      } catch (error) {
        toast.error("registration failed")
        console.error('Registration failed:', error);
      }
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const isValid = form.handleSubmit();
      if(!isValid) return;
    }}
    className="flex flex-col gap-3 justify-center items-center p-10 bg-gray-50 rounded-xl border border-gray-50 shadow"
  >
    <div className="w-full">
      <form.Field
        name="username"
        children={(field) => (
          <div className="mb-4">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {field.state.meta.errors?.map((error,idx) => (
              <p key={idx} className="text-red-500 text-sm mt-1">
                {error?.message}
              </p>
            ))}
          </div>
        )}
      />
    </div>

    <div className="w-full">
      <form.Field
        name="password"
        children={(field) => (
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {field.state.meta.errors?.map((error,idx) => (
              <p key={idx} className="text-red-500 text-sm mt-1">
                {error?.message}
              </p>
            ))}
          </div>
        )}
      />
    </div>

    <div className="w-full">
      <form.Field
        name="confirmPassword"
        children={(field) => (
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {field.state.meta.errors?.map((error,idx) => (
              <p key={idx} className="text-red-500 text-sm mt-1">
                {error?.message}
              </p>
            ))}
          </div>
        )}
      />
    </div>
    <button type="submit" className="w-full px-4 py-2 text-[20px] text-white font-medium bg-gray-900 shadow rounded-md cursor-pointer">Register</button>
    <button type='button' onClick={() => navigate({to: '/signin'})} className="mt-5 text-lg text-gray-400 font-medium cursor-pointer">
      Returning user? <span className="text-gray-900 font-medium">Sign In</span>
    </button>
  </form>
    
  );
}

export default RegisterPage;