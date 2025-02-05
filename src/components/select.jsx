import React, { useState } from "react";

export const Select = ({ children, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {children[0]} {/* SelectTrigger */}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {React.Children.map(children[1].props.children, (child) =>
            React.cloneElement(child, {
              onClick: (value) => {
                onValueChange(value);
                setIsOpen(false);
              },
            })
          )}
        </div>
      )}
    </div>
  );
};

export const SelectTrigger = ({ children, className }) => {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 border rounded-md ${className}`}
    >
      {children}
    </div>
  );
};

export const SelectContent = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectItem = ({ value, onClick, children }) => {
  return (
    <div
      onClick={() => onClick(value)}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
};

export const SelectValue = ({ placeholder , className}) => {
  return <span className={className}>{placeholder}</span>;
};
