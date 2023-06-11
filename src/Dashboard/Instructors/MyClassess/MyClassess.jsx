import { Link } from "react-router-dom";
import useMyClasses from "../../../hooks/useMyClasses";

const MyClassess = () => {

	const [, myClassess] = useMyClasses();
	console.log(myClassess)

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-5">My Classess</h2>
      <div className="">
        <div className="max-w-4/5 mx-auto">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th className="w-1/6">Class Image</th>
                  <th className="w-1/6">Class Name</th>
                  <th className="w-1/12">Seats</th>
                  <th className="w-1/12">Price</th>
                  <th className="w-1/12">Status</th>
                  <th className="w-1/12">Enrolled </th>
                  <th className="w-1/12">Feedback </th>
                  <th className="w-1/6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {myClassess?.map((classItem) => (
                  <tr key={classItem.id}>
                    <td className="w-1/6">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={classItem.image} alt="Class" />
                        </div>
                      </div>
                    </td>
                    <td className="w-1/6">{classItem.className}</td>
                    <td className="w-1/12">{classItem.seat}</td>
                    <td className="w-1/12">{classItem.price}</td>
                    <td className="w-1/12 font-bold text-orange-600">{classItem.status}</td>
                    <td className="w-1/12 font-bold text-orange-600">{classItem.enrolled}</td>
                    <td className="w-1/12 font-bold text-orange-600">{classItem.feedback.fb}</td>
                    <td className="w-1/12"><Link state={classItem} to={'/dashboard/updateClass'} className="btn bg-orange">Update</Link></td>
         
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClassess;
