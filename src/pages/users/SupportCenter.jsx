import { useState } from "react";
import { 
  FiHeadphones, 
  FiMail, 
  FiMessageSquare, 
  FiInfo,
  FiClock,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState("request");
  const [subject, setSubject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Support options
  const issueTypes = [
    { value: "account", label: "Account Issue" },
    { value: "transaction", label: "Transaction Problem" },
    { value: "login", label: "Login Trouble" },
    { value: "card", label: "Card Issue" },
    { value: "loan", label: "Loan Inquiry" },
    { value: "technical", label: "Technical Problem" },
    { value: "other", label: "Other" }
  ];

  const subjectOptions = [
    { value: "urgent", label: "Urgent - Need immediate assistance" },
    { value: "general", label: "General Inquiry" },
    { value: "bug", label: "Report a Bug" },
    { value: "suggestion", label: "Feature Suggestion" },
    { value: "complaint", label: "Complaint" }
  ];

  // Sample support history data
  const supportHistory = [
    {
      id: 1,
      subject: "Transaction Problem",
      issueType: "transaction",
      status: "resolved",
      date: "2023-06-15",
      message: "My recent wire transfer hasn't been processed yet"
    },
    {
      id: 2,
      subject: "General Inquiry",
      issueType: "account",
      status: "in_progress",
      date: "2023-06-10",
      message: "Need help updating my account information"
    },
    {
      id: 3,
      subject: "Report a Bug",
      issueType: "technical",
      status: "pending",
      date: "2023-05-28",
      message: "App crashes when viewing transaction history"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setPreview(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSuccessMessage("");

    const supportData = {
      subject,
      issueType,
      message
    };

    try {
      // Simulate API call (replace with real API request)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Support Request Submitted:", supportData);
      setSuccessMessage("Your support request has been submitted successfully!");
      setPreview(false);
      setSubject("");
      setIssueType("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("Failed to submit support request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "resolved":
        return <FiCheckCircle className="text-green-500" />;
      case "in_progress":
        return <FiClock className="text-blue-500" />;
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "rejected":
        return <FiAlertCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusText = (status) => {
    switch(status) {
      case "resolved":
        return "Resolved";
      case "in_progress":
        return "In Progress";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("request")}
              className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
                activeTab === "request" 
                  ? "text-primary-2 border-b-2 border-primary-2" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiHeadphones />
              Contact Support
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
                activeTab === "history" 
                  ? "text-primary-2 border-b-2 border-primary-2" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaHistory />
              Support History
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "request" ? (
              <>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">Contact Support</h1>
                <p className="text-gray-600 mb-6 flex items-center gap-1">
                  <FiInfo className="text-primary-2" /> Fill out the form below and our team will get back to you soon
                </p>

                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                    {successMessage}
                  </div>
                )}

                {!preview ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Subject */}
                    <div>
                      <SelectField
                        label="Subject"
                        options={subjectOptions}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        variant="outline"
                        required
                        placeholder="Select subject"
                        classNames="border-b-2 border-gray-200 py-3 px-0"
                      />
                    </div>

                    {/* Issue Type */}
                    <div>
                      <SelectField
                        label="Issue Type"
                        options={issueTypes}
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        variant="outline"
                        required
                        placeholder="Select issue type"
                        classNames="border-b-2 border-gray-200 py-3 px-0"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <InputField
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        variant="outline"
                        required
                        placeholder="Describe your issue in detail"
                        isTextarea={true}
                        classNames="border-b-2 border-gray-200 py-3 px-0 min-h-[120px]"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary-2 text-white font-medium rounded-lg shadow-md transition-all hover:brightness-110 hover:scale-105"
                    >
                      <FiMail className="text-lg" /> Submit Request
                    </button>
                  </form>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Support Request Summary</h2>

                    {/* Request Details Card */}
                    <div className="bg-primary-2/5 p-4 rounded-lg border border-primary-2/20 mb-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Subject</p>
                          <p className="font-medium text-gray-800">
                            {subjectOptions.find(s => s.value === subject)?.label || subject}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Issue Type</p>
                          <p className="font-medium text-gray-800">
                            {issueTypes.find(i => i.value === issueType)?.label || issueType}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Message Preview */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Your Message</p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-1">
                          <p className="text-gray-800 whitespace-pre-line">{message}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setPreview(false)}
                        className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
                      >
                        <FiMessageSquare /> Edit Message
                      </button>
                      <button
                        onClick={handleConfirm}
                        className={`w-full px-5 py-3 text-white font-medium rounded-lg shadow-md transition-all ${
                          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary-2 hover:brightness-110"
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Confirm Submission"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">Support History</h1>
                <p className="text-gray-600 mb-6 flex items-center gap-1">
                  <FiInfo className="text-primary-2" /> View your past support requests and their status
                </p>

                {supportHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <FaHistory className="mx-auto text-gray-400 text-3xl mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">No support history found</h3>
                    <p className="text-gray-500 mt-1">You haven't contacted support yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {supportHistory.map((ticket) => (
                      <div key={ticket.id} className="py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-800 truncate">
                                {ticket.subject}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                                {issueTypes.find(i => i.value === ticket.issueType)?.label || ticket.issueType}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{ticket.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Submitted on {formatDate(ticket.date)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {getStatusIcon(ticket.status)}
                            <span className={`text-sm whitespace-nowrap ${
                              ticket.status === 'resolved' ? 'text-green-600' :
                              ticket.status === 'in_progress' ? 'text-blue-600' :
                              ticket.status === 'pending' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {getStatusText(ticket.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;