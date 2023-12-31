/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../context/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignUp = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "user",
        };
        fetch("https://top-musicy-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Good job!", "User Created Successfully!", "success");
            navigate(from, { replace: true });
            navigate("/");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div>
      <div className=" flex justify-center text-center my-5">
        <p className="text-center">OR</p>
      </div>
      <div className="mt-3 space-y-3">
        <button
          onClick={handleGoogleSignUp}
          type="button"
          className="sign-with-google-btn"
        >
          <div className="absolute inset-y-0 left-0 p-4">
            <FcGoogle></FcGoogle>
          </div>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
