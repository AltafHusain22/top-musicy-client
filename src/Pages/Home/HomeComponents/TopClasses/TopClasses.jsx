import { useState } from "react";
import { useEffect } from "react";

const TopClasses = () => {
  const [topclasses, setTopClasses] = useState();

  useEffect(() => {
    fetch("https://top-musicy-server.vercel.app/classes/top")
      .then((res) => res.json())
      .then((data) => {
        setTopClasses(data);
      });
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="text-center w-full md:w-2/5 md:mx-auto my-[100px]">
        <p className="text-[#D99904] mb-2 text-xl font-bold">Top Classes</p>
        <h3 className="text-4xl uppercase mt-2 font-bold">Popular Classes</h3>
      </div>

      <div className=" grid md:grid-cols-3 gap-5 mb-10 ">
        {topclasses?.map((topclass) => (
          <div key={topclass._id}>
            <div className="card card-compact w-full bg-base-100 shadow-xl h-96">
              <figure>
                <img
                  className="h-[300px] w-full object-cover "
                  src={topclass.image}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{topclass.className}</h2>
                <div className="flex mb-5">
                  <p className="font-semibold">
                    {" "}
                    Instructor Name : {topclass.instructorName}
                  </p>
                  <p className="font-semibold">
                    {" "}
                    Available Seat : {topclass.seat}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopClasses;
