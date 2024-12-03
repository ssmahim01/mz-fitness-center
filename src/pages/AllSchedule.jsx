import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { MdOutlineDoneAll } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllSchedule = () => {
  const schedulesData = useLoaderData();
  const [schedules, setSchedules] = useState(schedulesData);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`https://mz-fitness-server.vercel.app/schedules?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setSchedules(data);
      });
  }, [search]);

  // const {_id} = useParams();
  // console.log(schedulesData, _id);

  const handleDelete = (id) => {
    // console.log(id);
    fetch(`https://mz-fitness-server.vercel.app/schedules/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "Deleted the schedule",
            icon: "success",
          });

          const remainingSchedule = schedules.filter(
            (singleData) => singleData._id !== id
          );
          setSchedules(remainingSchedule);
        }
      });
  };

  const handleUpdateStatus = (id) => {
    fetch(`https://mz-fitness-server.vercel.app/status/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "Confirm the schedule",
            icon: "success",
          });
          const newData = schedules.map((schedule) =>
            schedule._id === id ? { ...schedule, isConfirm: true } : schedule
          );
          setSchedules(newData);
        }
      });
  };

  return (
    <div className="my-8 lg:w-3/5 w-11/12 mx-auto">
      <label className="input input-bordered flex items-center gap-2 lg:w-2/5 w-3/5 mx-auto mb-5">
        <input
          type="text"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className="grow"
          placeholder="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-800 *:font-bold *:text-white/80">
              <th>Serial</th>
              <th>Title</th>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          {schedulesData.length > 0 ? (
            <tbody>
              {schedules.map((schedule, index) => (
                <tr className="*:font-semibold" key={schedule._id}>
                  <th>{index + 1}</th>
                  <td>{schedule?.title}</td>
                  <td>{schedule?.day}</td>
                  <td>{schedule?.formattedDate}</td>
                  <td>{schedule?.formatHour}</td>
                  <td className="flex gap-3 items-center">
                    <button
                      onClick={() => handleDelete(schedule._id)}
                      className="bg-rose-500 p-2 rounded-lg text-white"
                    >
                      <FaTrashAlt />
                    </button>

                    <Link to={`/updateSchedule/${schedule._id}`}>
                      <button className="bg-pink-500 p-2 rounded-lg text-white">
                        <IoDocument />
                      </button>
                    </Link>

                    <button
                      onClick={() => handleUpdateStatus(schedule._id)}
                      className="bg-cyan-500 p-2 rounded-lg text-white"
                    >
                      {schedule?.isConfirm ? (
                        <MdOutlineDoneAll className="font-bold" />
                      ) : (
                        <AiOutlineCheck className="font-bold" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tr>
              <th></th>
              <td className="md:text-xl text-rose-500 font-bold my-5">
                No Data Found
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default AllSchedule;
