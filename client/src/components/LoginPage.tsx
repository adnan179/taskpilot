import { useAuth } from '../context/AuthContext';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.username, value.password);
        navigate({ to: '/' });
      } catch (error) {
        alert("Login failed")
        console.error('Login failed:', error);
      }
    },
  });

  return (
    <section className="flex w-full min-h-screen justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="bg-gray-50 rounded-[36px] p-10 shadow-lg flex flex-col gap-3 justify-center items-center"
      >
        <h2 className="text-blue-500 text-[24px] font-semibold">Login</h2>

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
              <div className="mb-6">
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

        {form.state.isSubmitting && (
          <p className="text-sm text-gray-500">Logging in...</p>
        )}

        <button
          type="submit"
          className="flex px-4 py-2 bg-blue-500 text-white font-medium shadow-md rounded-lg"
        >
          Login
        </button>
        <button className="text-blue-400 text-lg font-medium cursor-pointer" 
          onClick={() => navigate({to: '/register'})}
        >
          Don't have an account?
        </button>
      </form>
    </section>
  );
}

export default LoginPage;;