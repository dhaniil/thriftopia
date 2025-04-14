import { ReactNode } from "react";

interface LinkTextProps {
  children: ReactNode;
  href?: string;
}

const LinkText = ({ children, href = "#" }: LinkTextProps) => {
    return (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 underline"
      >
        {children}
      </a>
    );
  };
  
  export default LinkText;
  