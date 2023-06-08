/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { FiTrash, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// fetch all users from db
const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.json();
  });

  //   set user role to an instructor
  const handleMakeInstructor = (user) => {
    fetch(`http://localhost:5000/users/instructor/${user._id}`, {
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
            title: `${user.name} hasbeen Instructor !`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  //   set user role to an Admin
  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
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
            title: `${user.name} hasbeen Admin !`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // delete a spesific user
  const handleDeleteUser = (user) => {
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} hasbeen Deleted !`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="w-full">
      <h2 className="text-center font-bold text-4xl my-5">Manage Users </h2>

      <div className=" w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <>
                <tr>
                  <th> {index + 1}</th>
                  <td> {user.name}</td>
                  <td> {user.email}</td>
                  <td> {user.role}</td>
                  <td>
                    {user.role === "instructor" ? (
                      <button className="btn btn-disabled w-4/5 ml-3"> Insructor </button>
                    ) : (
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="  ml-3 mr-3 btn bg-orange-500 border-none text-white font-bold"
                      >
                        Make Instructor
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="btn btn-disabled"> Admin </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-orange-500 border-none text-white font-bold"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className=" ml-3 btn bg-orange-500 border-none text-white font-bold"
                    >
                      <FiTrash2></FiTrash2>
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
