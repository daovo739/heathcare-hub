import { ArrowRight } from 'lucide-react';

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
      <div className="mt-4 text-primary font-semibold text-sm flex items-center">
        <span>{hero}</span>
        <ArrowRight className="ml-2" size={20} />
      </div>
    </div>
  );
};

export default ButtonCard;
