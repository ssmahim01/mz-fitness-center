import { useState } from "react";
import DatePicker from "react-datepicker";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";

// const formatTime = (date) => {
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");
//     const time = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     return `${hours}:${minutes}:${seconds} ${time}`;
//   };

const UpdateSchedule = () => {
  const schedule = useLoaderData();
  const { id } = useParams();
  const [title, setTitle] = useState(schedule?.title);
  const [date, setDate] = useState(schedule?.formattedDate);
  const [day, setDay] = useState(schedule?.day);
  const [time, setTime] = useState(schedule?.formatHour);
  const time2 = new Date();

  const handleUpdateSchedule = (e) => {
    e.preventDefault();


    const updateSchedule = {
      title,
      day,
      date,
      time,
    };

    fetch(`http://localhost:3500/schedules/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateSchedule),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "Updated the schedule",
            icon: "success",
          });
        }
      });
  };

  return (
    <div className="bg-base-200 min-h-screen py-28">
      <h2 className="text-center md:text-4xl text-3xl font-bold my-6">
        Update Gym Schedule
      </h2>
      <div className="hero">
        <div className="card lg:w-1/2 md:w-3/4 mx-auto bg-base-100 w-full shrink-0 shadow-2xl">
          <form onSubmit={handleUpdateSchedule} className="card-body">
            <div className="flex gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="input input-bordered w-full"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Date</span>
                </label>
                <DatePicker
                  className="input input-bordered w-full"
                  selected={date}
                  value={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Day</span>
                </label>
                <select
                  name="day"
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="input input-bordered *:font-bold"
                >
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Time</span>
                </label>
                <DatePicker
                  className="input input-bordered w-full"
                  value={time}
                  onChange={(time2) => setTime(time2)}
                  selected={time}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm:aa"
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent text-white text-lg font-bold">
                Update Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchedule;
