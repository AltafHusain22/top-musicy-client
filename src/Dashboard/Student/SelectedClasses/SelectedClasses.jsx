/* eslint-disable no-unused-vars */
import { FiTrash2 } from "react-icons/fi";
import useSelectedClass from "../../../hooks/useSelectedClass";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";

const SelectedClasses = () => {
  const [refetch, selectedClass] = useSelectedClass();
  const [price, setPrice] = useState(null)
  

  const handleDeleteClass = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/class/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: ` class has been Deleted !`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handlePayment = (classItem) => {
    setPrice(classItem)
  };

  const total = selectedClass.reduce((sum, item)=> item.price + sum , 0)

  return (
    <div>
      
      <h2 className="text-center mx-auto font-bold text-4xl mb-10">
        My Selected Classes
      </h2>
      <h2 className=" mx-auto font-bold text-2xl mb-10 text-orange-500">
         Total Price: ${total}
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Instructor Name </th>
              <th>Price </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <>
              {selectedClass.map((classItem, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{classItem.className}</td>
                  <td>{classItem.instructorName}</td>
                  <td>${classItem.price}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteClass(classItem._id)}
                      className=" ml-3 btn bg-orange-500 border-none text-white font-bold"
                    >
                      <FiTrash2></FiTrash2>
                    </button>
                    <Link
                      state={classItem}
                      price={price}
                      to={"/dashboard/checkout"}
                      onClick={() => handlePayment(classItem)}
                      className=" ml-3 btn bg-orange-500 border-none text-white font-bold"
                    >
                      PayNow
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClasses;
