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


  return (
    <div className="">
      <h2 className="text-center font-bold text-3xl my-5">Manage Classes</h2>

      <div className="max-w-4/5 mx-auto">
  <div className="overflow-x-auto">
    <table className="table w-full">
      {/* head */}
      <thead>
        <tr>
          <th className="w-1/6">Class Image</th>
          <th className="w-1/12">Class Name</th>
          <th className="w-1/12">Instructor Name</th>
          <th className="w-1/6">Instructor Email</th>
          <th className="w-1/12">Seats</th>
          <th className="w-1/12">Price</th>
          <th className="w-1/12">Status</th>
          <th className="w-1/6 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {/* rows */}
        {classes?.map((classItem) => (
          <tr key={classItem.id}>
            <td className="w-1/6">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={classItem.image} alt="Class" />
                </div>
              </div>
            </td>
            <td className="w-1/2">{classItem.className?.slice(1,30)}.....</td>
            <td className="w-1/12">{classItem.instructorName}</td>
            <td className="w-1/12">{classItem.email}</td>
            <td className="w-1/12">{classItem.seat}</td>
            <td className="w-1/12">{classItem.price}</td>
            <td className="w-1/12">{classItem.status}</td>
            <td className="w-full flex flex-col">
              {/* approve */}
              {classItem.status === "approved" ? (
                <button className=" w-full btn btn-sm btn-disabled font-bold ">
                  Approved
                </button>
              ) : (
                <button
                  onClick={() => handlePending(classItem.status)}
                  className="w-full btn btn-sm bg-orange-500 border-none text-white font-bold"
                >
                  Approve
                </button>
              )}

              {/* deny */}
              {classItem.status === "denied" ? (
                <button className="btn btn-sm btn-disabled mb-3 w-full font-bold text-red-500">Denied</button>
              ) : (
                <button
                  onClick={() => handleDeny(classItem.status)}
                  className=" w-full btn btn-sm bg-orange-500 border-none text-white font-bold"
                >
                  Deny
                </button>
              )}
              {classItem.status === "denied" &&
                 
                <Link
                  state={classItem}
                  to={'/dashboard/feedback'}
                  className=" w-full btn btn-sm bg-orange-500 border-none text-white font-bold"
                >
                  FeedBack
                </Link>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
      </div>
      

    </div>
  );
};

export default ManageClasses;
