import "./Button.css";

type ButtonVariant = "donate" | "join" | "ghost";

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`btn btn--${variant} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
