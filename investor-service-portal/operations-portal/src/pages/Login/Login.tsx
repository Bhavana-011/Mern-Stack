import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import { useAuth } from "../../hooks/useAuth";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setApiError("");

      await login(data.email, data.password);

      navigate("/dashboard");
    } catch (error) {
      setApiError("Invalid email or password.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Operations Portal
          </h1>

          <p className="mt-2 text-gray-500">
            Investor Service Request Management
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
            })}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-11 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {apiError && (
            <p className="text-sm text-red-500">
              {apiError}
            </p>
          )}

          <Button
            type="submit"
            loading={isSubmitting}
          >
            Login
          </Button>

        </form>

      </Card>
    </div>
  );
}

export default Login;