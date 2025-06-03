import { useAuth } from '../context/AuthContext';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';

const SignInForm = () => {
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
        navigate({ to: '/dashboard' });
      } catch (error) {
        alert("Login failed")
        console.error('Login failed:', error);
      }
    },
  });

  return (
    <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="bg-gray-50 rounded-xl p-10 shadow-lg flex flex-col gap-3 justify-center items-center"
      >
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
                  className="p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                  className="p-4 sm:w-[400px] w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
          className="w-full px-4 py-2 bg-gray-900 text-[20px] text-white font-medium shadow-md rounded-lg"
        >
          Sign In
        </button>
        <button type='button' className="text-gray-400 text-lg font-medium cursor-pointer mt-5" 
          onClick={() => navigate({to: '/register'})}
        >
          Don't have an account? <span className='text-gray-900'>Sign Up</span>
        </button>
      </form>
  );
}

export default SignInForm;