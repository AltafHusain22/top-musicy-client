import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

const PaymentHistry = () => {

	
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
              <th>ClassName</th>
              <th>Transection Id</th>
              <th>Amount</th>
              <th>Date </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <>
              {enrolledclasses.map((classItem, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{classItem.className}</td>
                  <td>{classItem.transectionId}</td>
                  <td>${classItem.price}</td>
                  <td>{classItem.data}</td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistry;
