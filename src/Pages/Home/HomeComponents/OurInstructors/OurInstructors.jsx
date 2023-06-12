import { useState, useEffect } from "react";

const OurInstructors = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("instructorimg.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {
        console.error("Error fetching instructor images:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <div className="text-center w-full md:w-2/5 md:mx-auto my-[100px]">
        <p className="text-[#D99904] mb-2 text-xl font-bold">Top Teachers</p>
        <h3 className="text-4xl uppercase mt-2 font-bold ">
          Meet Our Instructors
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-10 w-2/3 mx-auto">
        {images?.map((instructor, index) => (
          <div key={index}>
            <div className=" card bg-base-100 shadow-xl">
              <figure>
                <img
                  className=" w-96 h-96 object-cover"
                  src={instructor.image}
                  alt={instructor.name}
                />
              </figure>
              <h2 className="text-center font-bold py-5 text-xl">{ instructor.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurInstructors;
