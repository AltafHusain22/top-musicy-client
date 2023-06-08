/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BiFingerprint } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import SocialLogin from "../../components/shared/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import img from "../../..//public/Assets/Login&Registration/1.jpg";

const Login = () => {

  const { loginUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    loginUser(data)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire("Good job!", "LogIn Successfully!", "success");
        navigate(from , {replace:true});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <section className="bg-white  my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover object-top w-full h-full rounded-xl"
              src={img}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            {/* {error} */}
            <ToastContainer />
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in to Celebration
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Don’t have an account?
              <Link
                to={"/register"}
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
              >
                Create a free account
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="email-field-wrap">
                      <MdAlternateEmail></MdAlternateEmail>
                    </div>
                    <input
                      {...register("email", { required: true })}
                      className="email-input-field"
                      placeholder="Enter your Email"
                    />
                  </div>
                </div>
                {/* password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      Password
                    </label>

                    <Link to={"#"} className="forgot-link">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="pass-field-wrap">
                      <BiFingerprint></BiFingerprint>
                    </div>

                    <input
                      {...register("password", { required: true })}
                      placeholder="Enter your password"
                      className="pass-input-field"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    className="btn bg-[#FF7703] w-full text-white"
                    value="Login"
                  />
                </div>
              </div>
            </form>
            {/* social login */}
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
