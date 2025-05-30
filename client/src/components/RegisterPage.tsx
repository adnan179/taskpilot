import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import { useForm } from '@tanstack/react-form';


const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await register(value.username, value.password);
        navigate({ to: '/' });
      } catch (error) {
        alert("registration failed")
        console.error('Registration failed:', error);
      }
    },
  });

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
        <div className="w-full">
          <form.Field
            name="username"
            children={(field) => (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="p-4 sm:w-[350px] w-full rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {field.state.meta.errors?.map((error) => (
                  <p key={error} className="text-red-500 text-sm mt-1">
                    {error}
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
                  className="p-4 sm:w-[350px] w-full rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {field.state.meta.errors?.map((error) => (
                  <p key={error} className="text-red-500 text-sm mt-1">
                    {error}
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
                  className="p-4 sm:w-[350px] w-full rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {field.state.meta.errors?.map((error) => (
                  <p key={error} className="text-red-500 text-sm mt-1">
                    {error}
                  </p>
                ))}
              </div>
            )}
          />
        </div>
        <button type="submit" className="flex px-4 py-2 text-[16px] text-white font-medium bg-blue-500 shadow rounded-md">Register</button>
        <button onClick={() => navigate({to: '/login'})} className="text-blue-400 font-medium cursor-pointer">Returning user?</button>
      </form>
    </section>
    
  );
}

export default RegisterPage;