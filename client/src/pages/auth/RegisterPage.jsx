import Spinner from "../../utils/Spinner";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerFormValidation } from "../../utils/formValidation";
import { registerUser } from "../../api/authApi";
import InputField from "../../components/auth/InputField";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // field validation errors
  const [apiError, setApiError] = useState(""); // global/server error
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
function handleChange(e){
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 async function handleSubmit(e){
    e.preventDefault();
    const validationErrors = registerFormValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setApiError("");
      return;
    }
    setLoading(true);
    setErrors({});
    setApiError("");

    try {
      await registerUser(formData);
      navigate("/tasks");
    } catch (error) {
      setApiError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 mt-10 rounded shadow-md mx-aut w-full max-w-md bg-white">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter your name"
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />

        {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 cursor-pointer rounded-lg text-white font-medium transition-colors ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? <Spinner /> : "Register"}
        </button>
        <p className="m-2">Already have an account ? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;
