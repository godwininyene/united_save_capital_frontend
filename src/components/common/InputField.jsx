const InputField = ({
    classNames = "",
    type = "text",
    name,
    placeholder,
    defaultValue = "",
    isRequired = true,
    onChange,
    variant = "default", // 'default', 'outline', 'filled', 'floating'
    label,
    icon,
    error,
  }) => {
    // Base styles that all variants share
    const baseStyles = "w-full py-2 px-4 transition-all duration-200 focus:outline-none bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400";

    // Variant-specific styles
    const variants = {
      default: "border border-gray-300 dark:border-slate-600 rounded-lg focus:border-primary-2 dark:focus:border-blue-400 focus:outline-0 focus:ring-0",
      outline: "border-b-2 border-gray-300 dark:border-slate-600 bg-transparent focus:border-blue-500 dark:focus:border-blue-400",
      filled: "bg-gray-100 dark:bg-slate-700 rounded-lg focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
      floating: "border border-gray-300 dark:border-slate-600 rounded-lg peer focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400",
    };

    // Combine base + variant + custom classes
    const inputClasses = `${baseStyles} ${variants[variant] || variants.default} ${classNames}`;

    if (variant === "floating") {
      return (
        <div className="relative">
          <input
            type={type}
            name={name}
            placeholder=" "
            defaultValue={defaultValue}
            onChange={onChange}
            className={inputClasses}
            required={isRequired}
          />
          <label className="absolute left-4 top-3 text-gray-500 dark:text-slate-400 pointer-events-none transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base">
            {label}
          </label>
          {icon && (
            <div className="absolute right-3 top-3.5 text-gray-400 dark:text-slate-400">
              {icon}
            </div>
          )}
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
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            className={inputClasses}
            required={isRequired}
          />
          {icon && (
            <div className="absolute right-3 top-3.5 text-gray-400 dark:text-slate-400">
              {icon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
      </div>
    );
  };

  export default InputField;