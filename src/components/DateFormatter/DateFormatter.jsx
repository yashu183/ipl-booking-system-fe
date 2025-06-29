import './DateFormatter.css';

const DateFormatter = ({ date }) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(date).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return <><span>{formattedDate} </span> <span className="time">|  {formattedTime}</span></>
};

export default DateFormatter;