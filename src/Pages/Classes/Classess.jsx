/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Classess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], isLoading } = useQuery(["classes"], async () => {
    const res = await fetch(
      "https://top-musicy-server.vercel.app/approvedclass"
    );
    return res.json();
  });

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <div className="mt-10 w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-800"></div>
      </div>
    );
  }

  //show the popup if user not loggedIn

  const showPopup = () => {
    Swal.fire({
      title: "You are not LoggedIn?",
      text: "Please LogIn Before Select The class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  // handleSelectClasses // class will post to db

  const handleSelectClasses = (selectedClass) => {
    if (user && user.email) {
      const dataToSend = {
        ...selectedClass,
        UserEmail: user.email,
      };

      fetch("https://top-musicy-server.vercel.app/userselectedclass/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire("Good job!", "Selected Successfully!", "success");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="my-20 w-11/12 mx-auto">
      <div className="grid md:grid-cols-3 gap-5 mb-10 max-w-screen-2xl mx-auto">
        {classes?.map((classes, index) => (
          <div key={index}>
            <div
              className={`card card-compact bg-base-100 shadow-xl ${
                classes.seat === 0 ? "bg-red-500" : ""
              }`}
            >
              <figure>
                <img className="w-full h-96 object-cover" src={classes.image} />
              </figure>
              <div className="card-body">
                <h2 className="text-left font-bold text-[19px]">
                  {classes.className}
                </h2>
                <h2 className="font-semibold">
                  Instructor Name: {classes.instructorName}
                </h2>
              </div>
              <div className="px-5 py-5 flex  justify-between border-t-2 border-red-100">
                <span>
                  <h2 className="text-left font-semibold">
                    Available Seat: {classes.seat}
                  </h2>
                  <h2 className="font-semibold">Price: {classes.price}</h2>
                </span>

                {!user && (
                  <button
                    onClick={showPopup}
                    className={`btn bg-orange-400 border-0 text-white w-[125px] text-[14px] text-start ml-10 ${
                      classes.seat === 0 ? "disabled" : ""
                    }`}
                    disabled={classes.seat === 0}
                  >
                    Select Class
                  </button>
                )}

                {user && (
                  <button
                    onClick={() => handleSelectClasses(classes)}
                    className={`btn bg-orange-400 border-0 text-white w-[125px] text-[14px] text-start ml-10 ${
                      classes.seat === 0 ? "disabled" : ""
                    }`}
                    disabled={classes.seat === 0}
                  >
                    Select Class
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classess;
