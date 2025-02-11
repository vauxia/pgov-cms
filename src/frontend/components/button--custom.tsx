interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const CustomButton = ({ text, onClick, className }: ButtonProps) => (
  <button
    className={`button-state-styles usa-button usa-button--unstyled text-no-underline padding-x-2 padding-y-105 text-bold text-black ${className}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default CustomButton;
