export const Button = ({ variant={},children, onClick, className={} }) => {
    return (
      <button
        onClick={onClick}
        variant={variant}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${className}`}
      >
        {children}
      </button>
    );
  };
  