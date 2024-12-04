type ButtonCardProps = {
  title: string;
  subtitle: string;
  hero: string;
};

const ButtonCard: React.FC<ButtonCardProps> = ({ title, subtitle, hero }) => {
  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-600">{subtitle}</p>

      {/* Button Indicator */}
      <div className="mt-4 text-blue-500 font-semibold text-sm flex items-center">
        <span>{hero}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5l6 6m0 0l-6 6m6-6H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default ButtonCard;
