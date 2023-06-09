import { useState } from "react";
import { useEffect } from "react";

const TopClasses = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/classes/top")
      .then((res) => res.json())
      .then((data) => {

        setImages(data);
      });
  }, []);

  return (
    <div>
      <div className="text-center w-full md:w-2/5 md:mx-auto my-[100px]">
        <p className="text-[#D99904] mb-2 text-xl font-bold">Top Classes images</p>
        <h3 className="text-4xl uppercase mt-2 font-bold">Popular Classes</h3>
      </div>

      <div className=" grid md:grid-cols-3 gap-5 mb-10">
        {images?.map((topImg) => (
          <div key={topImg._id}>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
              <figure>
                <img className="h-[300px] w-full object-cover " src={topImg.image} />
              </figure>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopClasses;
