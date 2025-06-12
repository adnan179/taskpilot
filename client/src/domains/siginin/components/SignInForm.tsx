import { signinSchema } from '@/domains/siginin/schemas/signinSchema';
import { useAuth } from '@/context/AuthContext';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';

const SignInForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators:{
      onSubmit: signinSchema
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.username, value.password);
        toast.success("Sign in successfully")
        navigate({ to: '/dashboard' });
      } catch (error) {
        toast.error("Sign in failed");
        console.error('Login failed:', error);
      }
    },
  });

  return (
    <form
        onSubmit={(e) => {
          e.preventDefault();
          const isValid = form.handleSubmit();
          if(!isValid) return;
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
              <div className="mb-6">
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

        {form.state.isSubmitting && (
          <p className="text-xl text-gray-800">Signing in...</p>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-gray-900 text-[20px] text-white font-medium shadow-md rounded-lg cursor-pointer"
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