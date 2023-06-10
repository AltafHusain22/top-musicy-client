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
    const res = await fetch("http://localhost:5000/allclasses");
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
    const { className, instructorName, price } = selectedClass;
    fetch(`http://localhost:5000/userselectedclass/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(selectedClass),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Good job!", "Selected Successfully!", "success");
        }
      });
  };

  return (
    <div className="my-20">
      <div className="grid md:grid-cols-3 gap-5 mb-10 w-2/3 mx-auto">
        {classes?.map((classes, index) => (
          <div key={index}>
            <div
              className={`card card-compact bg-base-100 shadow-xl ${
                classes.seat === 0 ? "bg-red-500" : ""
              }`}
            >
              <figure>
                <img className="w-96 h-96 object-cover" src={classes.image} />
              </figure>
              <div className="card-body">
                <h2 className="text-left font-bold text-[19px]">
                  {classes.className}
                </h2>
                <h2 className="font-semibold">
                  Instructor Name: {classes.instructorName}
                </h2>
              </div>
              <div className="px-5 py-5 flex border-t-2 border-red-100">
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
