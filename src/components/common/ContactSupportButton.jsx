import { FiHeadphones } from "react-icons/fi";

const ContactSupportButton = ({ text, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center cursor-pointer justify-center gap-2 px-5 py-3 bg-primary-2 text-white font-medium rounded-lg shadow-md transition-all hover:brightness-110 ${className}`}
    >
      <FiHeadphones className="text-lg" />
      {text || "Contact Support"}
    </button>
  );
};

export default ContactSupportButton;