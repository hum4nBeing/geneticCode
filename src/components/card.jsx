export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white p-4 rounded-2xl shadow-lg ${className}`}>
        {children}
      </div>
    );
  };
  
  // CardContent Component
  export const CardContent = ({ children, className }) => {
    return (
      <div className={`p-2 ${className}`}>
        {children}
      </div>
    );
  };
  