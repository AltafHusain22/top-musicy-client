import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

const EnrolledClasses = () => {

	const [ , enrolledclasses] = useEnrolledClasses()

  return (
    <div>
      <h2 className="text-center mx-auto font-bold text-4xl mb-10">
        My Enrolled Classes
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
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <>
              {enrolledclasses.map((classItem, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{classItem.className}</td>
                  <td>{classItem.InstructorName}</td>
                  <td>${classItem.price}</td>
           
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClasses;
