import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddAClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const image_upload_token = import.meta.env.VITE_image_upload_token;
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      select: {},
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageRes) => {
        if (imageRes.success) {
          const imgUrl = imageRes.data.display_url;
          const { className, email, instructorName, price, seat } = data;
          const classData = {
            className,
            email,
            image: imgUrl,
            instructorName,
            price: parseFloat(price),
            seat: parseInt(seat),
            instructor_img: user.photoURL,
            feedback: '',
            status: 'pending',
            enrolled: 0
          
          };
          console.log(classData)
          axiosSecure.post("/addclass", classData )
            .then((data) => {
            if (data.config.data) {
              Swal.fire("Great!", "Class Added Successfylly !", "success");
              
            }
              setIsPending(true);
              reset();
          });
        }
      });


  };

  return (
    <section className=" bg-gray-100 pt-10 h-screen">
      <h3 className=" mb-10 text-3xl font-semibold text-center text-gray-900">
        Add a Class
      </h3>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-5xl mx-auto ">
          <div className="mt-6 overflow-hidden bg-white rounded-xl">
            <div className="px-6 sm:p-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Class Name
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        {...register("className", { required: true })}
                        type="text"
                        name="className"
                        placeholder="Enter a Class Name"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Class Image
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        name="image"
                        type="file"
                        {...register("image", { required: true })}
                        className="file-input file-input-bordered w-full "
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Instructor Name
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        {...register("instructorName", { required: true })}
                        type="text"
                        name="instructorName"
                        defaultValue={user?.displayName}
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Instructor Email
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        name="email"
                        defaultValue={user?.email}
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Price
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        {...register("price", { required: true })}
                        type="text"
                        name="price"
                        placeholder="Add Price"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Available Seats
                    </label>
                    <div className="mt-2.5 relative">
                      <input
                        {...register("seat", { required: true })}
                        type="text"
                        name="seat"
                        placeholder="Available Seats"
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className={`inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-black border border-transparent rounded-md focus:outline-none hover:bg-slate-700 focus:bg-slate-700 ${
                        isPending ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleSubmit}
                      disabled={isPending}
                    >
                      {isPending ? "Pending" : "Add a Class"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAClass;
