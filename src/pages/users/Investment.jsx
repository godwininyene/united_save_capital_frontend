import { FiBarChart2, FiUser, FiBookOpen } from "react-icons/fi";
import ContactSupportButton from "../../components/common/ContactSupportButton";

const Investment = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-2">Investment</h1>
          <h2 className="text-xl text-primary-2 font-medium mb-4">United Save Capital Investment</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Welcome to a more personal way to think about your wealth
          </p>
          <ContactSupportButton 
            text="Contact Support to get started"
            className="w-full md:w-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Expert Guidance Card */}
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg border border-gray-200 dark:border-slate-600 transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-2/10 dark:bg-primary-2/20 p-2 rounded-full">
                <FiBarChart2 className="text-primary-2 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Expert Guidance</h3>
            </div>
            <p className="text-gray-600 dark:text-slate-400">
              Tap into United Save Capital Research for help adapting your investment strategy 
              to changes in the markets and in your life.
            </p>
          </div>

          {/* Personal Connection Card */}
          <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg border border-gray-200 dark:border-slate-600 transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-2/10 dark:bg-primary-2/20 p-2 rounded-full">
                <FiUser className="text-primary-2 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Personal Connection</h3>
            </div>
            <p className="text-gray-600 dark:text-slate-400">
              Work with a United Save Capital Advisor to develop a personalized strategy 
              to help you meet your most important goals.
            </p>
          </div>
        </div>

        {/* Research Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary-2/10 dark:bg-primary-2/20 p-2 rounded-full">
              <FiBookOpen className="text-primary-2 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
              Stay informed with research that sets the standard
            </h3>
          </div>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            United Save Capital analysts deliver comprehensive market research that leads the industry. 
            Browse the latest insights, like market performance over time, to help you make 
            informed investment decisions.
          </p>

          {/* Market Performance Card */}
          <div className="bg-primary-2/5 dark:bg-blue-900/20 p-6 rounded-lg border border-primary-2/20 dark:border-blue-800/30 transition-all hover:shadow-md">
            <h4 className="font-semibold text-gray-800 dark:text-slate-100 mb-2">Market Performance Over Time</h4>
            <p className="text-gray-600 dark:text-slate-400">
              In 22 of the last 40 years, the market dipped by double digits—but still 
              ended the year with positive returns 75% of the time
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-slate-400 mb-4">
            Whether you're new to investing or have years of experience, 
            we have a strategy for you
          </p>
          <ContactSupportButton 
            text="Get Started with Investing"
            className="w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Investment;