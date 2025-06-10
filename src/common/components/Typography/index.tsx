import React from "react";
import Heading, { HeadingLevel } from "./Heading";

interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

const createHeading = (level: HeadingLevel) => {
  const Component: React.FC<TypographyProps> = ({ children, className = "" }) => (
    <Heading level={level} className={className}>
      {children}
    </Heading>
  );
  Component.displayName = `H${level}`;
  return Component;
};

export const H1 = createHeading(1);
export const H2 = createHeading(2);
export const H3 = createHeading(3);
export const H4 = createHeading(4);
export const H5 = createHeading(5);
export const H6 = createHeading(6);

export const Text: React.FC<TypographyProps> = ({ children, className = "" }) => (
  <p className={`text-base text-gray-300 ${className}`}>{children}</p>
);

export default Heading;
