/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
// import registerImg from "../../../public/Assets/others/authentication.gif";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BiFingerprint } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../../components/shared/SocialLogin/SocialLogin";

const Register = () => {
  const { createUser ,updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate()
  // handle user register
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value 

    // form validation

    if (name === "" || email === "" || password === "") {
      toast("Field Must Not Be Empty!");
      return;
    } else if (password.length < 6) {
      toast("Password Mustbe 6 char!");
      return;
    }
    
    // else if (/^(?=.*\d)$/.test(password)) {
    //   toast("password should contain at least 1 digit!");
    //   return;
    // } else if (/^(?=(.*\W){1})$/.test(password)) {
    //   toast("should contain at least 1 special characters ! ");
    //   return;
    // } else if (/^(?=.*[a-zA-Z])$/.test(password)) {
    //   toast("should contain at least 1 alphabetic character! ");
    //   return;
    // } else if (/^ (?!.*\s) $/.test(password)) {
    //   toast("should not contain any blank space! ");
    //   return;
    // } 
    
    else {
      createUser(email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          
          updateUserProfile(name, photo)
          .then(()=>{
            const  userInfo = { name : name , email : email }
            fetch('http://localhost:5000/users',{
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(userInfo)
            })

            .then(res => res.json())
            .then(data=> {
              console.log(data)
            if(data.insertedId ){
              Swal.fire("Good job!", "User Created Successfully!", "success");
              form.reset();
              navigate('/')
                }
            })
          })
         })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };
  

  return (
    <section className="bg-white  mt-20">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover object-top w-full h-full rounded-xl"
              // src={registerImg}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>

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
            {/* <ToastContainer /> */}
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign UP to Celebration
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?
              <Link
                to={"/login"}
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
              >
                Login
              </Link>
            </p>

            <form onSubmit={handleRegister} className="mt-8">
              <div className="space-y-5">
                {/* name field */}
                <div>
                  <label className="text-base font-medium text-gray-900">
                    First & Last Name
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="email-field-wrap">
                      <AiOutlineUserAdd></AiOutlineUserAdd>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your name "
                      className="name-input-field"
                    />
                  </div>
                </div>
                {/* email field */}
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
                {/* Photo url */}
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Photo URL
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="photo-field-wrap">
                      <BiPhotoAlbum></BiPhotoAlbum>
                    </div>
                    <input
                      type="text"
                      name="photo"
                      placeholder="Enter photo Url"
                      className="email-input-field"
                    />
                  </div>
                </div>
                {/* password field*/}
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
           <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;