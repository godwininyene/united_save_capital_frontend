const SelectField = ({
    name,
    onChange,
    options = [], // Default to empty array
    isRequired = true,
    classNames = "",
    defaultValue = "",
    variant = "default", // 'default', 'outline', 'filled', 'floating'
    label,
    icon,
    error,
  }) => {
    // Base styles that all variants share
    const baseStyles = "w-full py-2 px-4 pr-10 transition-all duration-200 focus:outline-none appearance-none bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100";

    // Variant-specific styles
    const variants = {
      default: "border border-gray-300 dark:border-slate-600 rounded-lg focus:border-primary-light dark:focus:border-blue-400 focus:outline-0 focus:ring-0",
      outline: "border-b-2 border-gray-300 dark:border-slate-600 bg-transparent focus:border-blue-500 dark:focus:border-blue-400",
      filled: "bg-gray-100 dark:bg-slate-700 rounded-lg focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
      floating: "border border-gray-300 dark:border-slate-600 rounded-lg peer focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400",
    };

    // Combine base + variant + custom classes
    const selectClasses = `${baseStyles} ${variants[variant] || variants.default} ${classNames}`;

    // Chevron icon for the select dropdown
    const ChevronIcon = () => (
      <svg 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-slate-400 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );

    // Handle both string and object options
    const renderOptions = () => {
      return options.map((option, index) => {
        // If option is a string
        if (typeof option === 'string') {
          return (
            <option key={index} value={option} className="bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100">
              {option}
            </option>
          );
        }
        // If option is an object with value and label
        if (option.value !== undefined) {
          return (
            <option key={index} value={option.value} className="bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100">
              {option.label || option.value}
            </option>
          );
        }
        // Fallback for other object structures
        return (
          <option key={index} value={JSON.stringify(option)} className="bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100">
            {option.name || option.title || JSON.stringify(option)}
          </option>
        );
      });
    };

    if (variant === "floating") {
      return (
        <div className="relative">
          <select
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
            className={`${selectClasses} ${defaultValue ? 'pt-5' : ''}`}
            required={isRequired}
          >
            <option value="" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"></option>
            {renderOptions()}
          </select>
          <label className={`absolute left-4 text-gray-500 dark:text-slate-400 pointer-events-none transition-all duration-200 
            ${defaultValue ? '-top-2 text-xs text-blue-500 dark:text-blue-400' : 'top-3 text-base'}`}>
            {label}
          </label>
          <ChevronIcon />
          {icon && <div className="absolute left-3 top-3.5 text-gray-400 dark:text-slate-400">{icon}</div>}
          {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
        </div>
      );
    }

    return (
      <div className="relative">
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-3.5 text-gray-400 dark:text-slate-400 z-10">{icon}</div>}
          <select
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
            className={`${selectClasses} ${icon ? 'pl-10' : ''}`}
            required={isRequired}
          >
            <option value="" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100">
              -- Select --
            </option>
            {renderOptions()}
          </select>
          <ChevronIcon />
        </div>
        {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
      </div>
    );
  };

  export default SelectField;