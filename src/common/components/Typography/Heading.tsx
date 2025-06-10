import React, { ElementType } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  className?: string;
  children: React.ReactNode;
}

const levelClasses: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-tight",
  2: "text-3xl font-semibold tracking-tight",
  3: "text-2xl font-medium tracking-tight",
  4: "text-xl font-medium",
  5: "text-lg font-medium",
  6: "text-base font-medium",
};

const Heading: React.FC<HeadingProps> = ({
  level = 1,
  className = "",
  children,
}) => {
  const Component = (`h${level}` as unknown) as ElementType;
  return <Component className={`${levelClasses[level]} ${className}`}>{children}</Component>;
};

export default Heading;
