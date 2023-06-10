/* eslint-disable no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery(["classes"], async () => {
    const res = await fetch("http://localhost:5000/allclasses");
    return res.json();
  });
  console.log(typeof data);

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <div className="mt-10 w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-800"></div>
      </div>
    );
  }

  // handle pending status
  const handlePending = (status) => {
    fetch(`http://localhost:5000/class/${status}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Class Approved !`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // handleDeny status

  const handleDeny = (status) => {
    fetch(`http://localhost:5000/deny/${status}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Class Denied!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // handleFeedback
  const handleFeedback = (feedback) => {};

  return (
    <div className="w-full">
      <h2 className="text-center font-bold text-3xl my-5">Manage Classes</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {classes?.map((classItem) => (
              <tr key={classItem.id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={classItem.image} alt="Class" />
                    </div>
                  </div>
                </td>
                <td>{classItem.className}</td>
                <td>{classItem.instructorName}</td>
                <td>{classItem.email}</td>
                <td>{classItem.seat}</td>
                <td>{classItem.price}</td>
                <td>{classItem.status}</td>
                <td>
                  {/* approve */}
                  {classItem.status === "approved" ? (
                    <button className="btn btn-sm btn-disabled ml-3">
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePending(classItem.status)}
                      className="ml-3 mr-3 btn bg-orange-500 border-none text-white font-bold"
                    >
                      Approve
                    </button>
                  )}

                  {/* deny */}
                  {classItem.status === "denied" ? (
                    <button className="btn btn-disabled ml-3">Denied</button>
                  ) : (
                    <button
                      onClick={() => handleDeny(classItem.status)}
                      className="ml-3 mr-3 btn bg-orange-500 border-none text-white font-bold"
                    >
                      Deny
                    </button>
                  )}
                  <Link to={'/dashboard/feedback'}
                      className="ml-3 mr-3 btn bg-orange-500 border-none text-white font-bold"
                    >
                      FeedBack
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
