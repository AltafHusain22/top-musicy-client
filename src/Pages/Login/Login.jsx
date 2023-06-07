/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useRef, useState } from "react";
import { BiFingerprint } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import SocialLogin from "../../components/shared/SocialLogin/SocialLogin";

const Login = () => {
  // handle captcha
  const [disabled, setDisabled] = useState(true);
  const { loginUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"
  
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const ref = useRef();
  const handleValidateCaptcha = () => {
    let user_captcha_value = ref.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Captcha Doesn't Matched!",
      });
    }
  };

  const handleLogin = (event) => {
   
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
   
    if (email === "" || password === "") {
      toast("Field Must Not Be Empty!");
      return;
    } else {
      loginUser(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Swal.fire("Good job!", "LogIn Successfully!", "success");
          form.reset()
          navigate(from)
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  return (
    <section className="bg-white  mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover object-top w-full h-full rounded-xl"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/4/girl-thinking.jpg"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">
                Join with Us to Get & <br className="hidden xl:block" />
                Awesome Healt Foods
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <BsCheck className="text-white"></BsCheck>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Quality Foods
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <BsCheck className="text-white"></BsCheck>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Fast Delivery
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <BsCheck className="text-white"></BsCheck>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Fresh Foods
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <BsCheck className="text-white"></BsCheck>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Reasonable Price
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            {/* {error} */}
            <ToastContainer/>
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

            <form method="post" onSubmit={handleLogin} className="mt-8">
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
                      type="email"
                      name="email"
                      placeholder="Enter email to get started"
                      className="email-input-field"
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
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="pass-input-field"
                    />
                  </div>
                </div>
                {/* captcha field */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      <LoadCanvasTemplate />
                    </label>
                  </div>
                  <div className="captcha-wrap">
                    <input
                      onBlur={handleValidateCaptcha}
                      ref={ref}
                      type="text"
                      name="captcha"
                      placeholder="Enter above captcha"
                      className="captcha-input-field"
                    />
                  </div>
                </div>

                <div>
                  <input
                  //  TODO: have to be enable for captcha
                    // disabled={disabled} 
                    type="submit"
                    className="btn btn-primary w-full text-white"
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
