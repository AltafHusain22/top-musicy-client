/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";

const Instructors = () => {
  const { data: instructors = [], isLoading } = useQuery(
    ["instructors"],
    async () => {
      const res = await fetch(
        "https://top-musicy-server.vercel.app/allclasses"
      );
      return res.json();
    }
  );
  console.log(instructors);

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <div className="mt-10 w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-800"></div>
      </div>
    );
  }
  // todo: instructor images should be change from db

  return (
    <div className="my-20">
      <div className="grid md:grid-cols-3 gap-5 mb-10 w-2/3 mx-auto">
        {instructors?.map((instructor, index) => (
          <div key={index}>
            <div className=" card card-compact bg-base-100 shadow-xl">
              <figure>
                <img
                  className=" w-96 h-96 object-cover"
                  src={instructor.instructor_img}
                />
              </figure>
              <div className="card-body">
                <h2 className="text-left font-semibold">
                  {" "}
                  Instructor Name: {instructor.instructorName}
                </h2>
                <h2 className="font-semibold"> Email : {instructor.email}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
