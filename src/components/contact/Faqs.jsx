import { useState } from "react";
import { faqs } from "../../constants";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

const Faqs = () => {
  const [activeID, setActiveID] = useState(null);

  const toggleFAQ = (id) => {
    setActiveID((prevID) => (prevID === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto py-10 ">
      <div className="relative">
        <div className="absolute z-0 w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40"></div>
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        {faqs.map((faq) => (
          <div key={faq.id} className="border-b border-gray-300">
            {/* Question Section */}
            <button
              className="w-full flex justify-between items-center text-left cursor-pointer px-5 py-4 bg-gray-800 text-white hover:bg-[#FF4E50] transition duration-300"
              onClick={() => toggleFAQ(faq.id)}
            >
              <strong>{faq.question}</strong>
              {activeID === faq.id ? (
                <FaArrowCircleUp className="text-lg" />
              ) : (
                <FaArrowCircleDown className="text-lg" />
              )}
            </button>

            {/* Answer Section */}
            <div
              className={`px-5 py-4 text-gray-900 bg-gray-100 transition-all duration-300 ${
                activeID === faq.id ? "block" : "hidden"
              }`}
            >
              <p>{faq.ans}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
