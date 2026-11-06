import React, { useState } from "react";
import useUserCrud from "../../configurations/crud/useUserCrud";
import * as yup from "yup";
import { useFormik } from "formik";
import useStore from "../../configurations/useStore";
import Button from "../Base/Button";
import Logo3 from "../../../assets/Logo3.png";

function Login() {
  const { handleLogin } = useStore();
  const { Authenticate } = useUserCrud();
  const [isLoading, setIsLoading] = useState(false);

  const init = {
    userName: "",
    password: "",
  };

  const schema = yup.object().shape({
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    isValid,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: init,
    validationSchema: schema,
    onSubmit(val) {
      handleLoginCrud(val);
    },
  });

  const handleLoginCrud = async (val) => {
    setIsLoading(true);
    try {
      const res = await Authenticate(val);
      if (res) {
        const loginData = res.data;
        if (loginData.result.succeeded) {
          handleLogin(loginData);
        } else {
          alert(loginData.result.message);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "text-white placeholder-gray-300 bg-teal-900 w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:border-green-300 focus:ring-1 focus:ring-green-300 outline-none transition-all duration-300 ease-in-out";

  return (
    <div className="h-screen flex items-center justify-center bg-teal-900">
      <div className="border border-teal-900 shadow-2xl bg-amber-400 py-6 px-6 rounded-3xl">
        <div className="flex justify-center">
          <img src={Logo3} alt="Arsh Library Logo" width={250} />
        </div>

        <h5 className="text-xl font-bold text-center text-gray-800 my-4">
          Login to Arsh Library
        </h5>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="userName"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              User Name:
            </label>
            <input
              className={inputClass}
              type="text"
              id="userName"
              name="userName"
              placeholder="username"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.userName && errors.userName && (
              <div className="text-red-500 text-sm">{errors.userName}</div>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Password:
            </label>
            <input
              className={inputClass}
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          {/* Login button */}
          <div className="flex justify-center">
            <Button
              className="text-white bg-teal-900 hover:bg-teal-600"
              type="submit"
              disabled={!isValid || isLoading}
              isLoading={isLoading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </div>

          {/* Forgot password */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-gray-800 hover:underline active:scale-95"
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;