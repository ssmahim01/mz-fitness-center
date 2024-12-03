import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const time = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes}:${seconds} ${time}`;
};

const AddSchedule = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const isConfirm = false;

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const day = e.target.day.value;
    const formatHour = formatTime(selectedTime);
    const formattedDate = startDate.toLocaleDateString("en-UK");
    const scheduleInfo = {
      title, day, formatHour, formattedDate, isConfirm
    };

    fetch("http://localhost:3500/schedules", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(scheduleInfo)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId){
        Swal.fire({
          title: 'Success!',
          text: 'Your schedule have been added',
          icon: 'success',
          confirmButtonText: 'Okay'
        })
      }
    })
  };

  return (
    <div className="bg-base-200 min-h-screen py-28">
      <h2 className="text-center md:text-4xl text-3xl font-bold my-6">Add Gym Schedule</h2>
      <div className="hero">
        <div className="card lg:w-1/2 md:w-3/4 mx-auto bg-base-100 w-full shrink-0 shadow-2xl">
          <form onSubmit={handleAddSchedule} className="card-body">
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
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Date</span>
                </label>
                <DatePicker
                className="input input-bordered w-full"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
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
                  selected={selectedTime}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm:aa"
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-secondary text-lg text-white font-bold">
                Add Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
