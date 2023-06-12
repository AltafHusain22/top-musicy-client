/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BiFingerprint } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../../components/shared/SocialLogin/SocialLogin";
import img from "../../../src/assets/Assets/Login&Registration/1.jpg";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      updateUserProfile(data.name, data.photo)
        .then(() => {
          console.log(data);
          const saveUser = {
            name: data.name,
            email: data.email,
            role: "user",
            image: data.photo,
          };
          fetch("https://top-musicy-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <section className="bg-white max-w-screen-2xl mx-auto">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2 my-20">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover object-top w-full h-full rounded-xl"
              src={img}
              alt="Background"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign Up for Celebration
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
              >
                Login
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-5">
                {/* name field */}
                <div>
                  <label className="text-base font-medium text-gray-900">
                    First & Last Name
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="email-field-wrap">
                      <AiOutlineUserAdd />
                    </div>
                    <input
                      {...register("name", { required: true })}
                      aria-invalid={errors.name ? "true" : "false"}
                      placeholder="Enter Your Name"
                      className="name-input-field"
                    />
                    {errors.name?.type === "required" && (
                      <p className="text-red-600 mt-3" role="alert">
                        Name is required! Must not be empty.
                      </p>
                    )}
                  </div>
                </div>
                {/* email field */}
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email Address
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="email-field-wrap">
                      <MdAlternateEmail />
                    </div>
                    <input
                      {...register("email", { required: true })}
                      aria-invalid={errors.email ? "true" : "false"}
                      placeholder="Enter email to get started"
                      className="email-input-field"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-600 mt-3" role="alert">
                        Email Address is required! Must not be empty.
                      </p>
                    )}
                  </div>
                </div>
                {/* Photo url */}
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Photo URL
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="photo-field-wrap">
                      <BiPhotoAlbum />
                    </div>
                    <input
                      {...register("photo")}
                      placeholder="Enter photo URL"
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
                      <BiFingerprint />
                    </div>
                    <input
                      placeholder="Enter your password"
                      className="pass-input-field"
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-red-600">Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-600">
                        Password must be at least 6 characters
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-600">
                        Password must contain at least one capital letter and
                        one special character
                      </p>
                    )}
                  </div>
                </div>
                {/* Confirm password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="pass-field-wrap">
                      <BiFingerprint />
                    </div>
                    <input
                      placeholder="Confirm your password"
                      className="pass-input-field"
                      type="password"
                      {...register("confirm", {
                        required: true,
                        validate: (value) => value === watch("password"),
                      })}
                    />
                    {errors.confirm?.type === "required" && (
                      <p className="text-red-600">
                        Confirm password is required
                      </p>
                    )}
                    {errors.confirm?.type === "validate" && (
                      <p className="text-red-600">Password does not match</p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="submit"
                    className="btn btn-primary w-full text-white"
                    value="Sign Up"
                  />
                </div>
              </div>
            </form>

            {/* social login */}
            <SocialLogin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
