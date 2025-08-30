import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginFormValidation } from "../../utils/formValidation";
import { loginUser } from "../../api/authApi";
import Spinner from "../../utils/Spinner";
import InputField from "../../components/auth/InputField";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = loginFormValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setApiError("");
      return;
    }

    setLoading(true);
    setErrors({});
    setApiError("");

    try {
      const { user } = await loginUser(formData);
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/tasks");
      }
    } catch (error) {
      setApiError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 mt-10 rounded shadow-md mx-auto w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {apiError && (
          <p className="text-red-500 py-2 text-sm mt-1">{apiError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white cursor-pointer py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Login"}
        </button>
        <p className="m-2">Don't have an account ? <Link to="/register" className="text-blue-600">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;
