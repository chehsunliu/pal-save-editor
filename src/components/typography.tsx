import React from "react";

import { cn } from "@/lib/utils.ts";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const H1 = ({ children, className, ...props }: Props) => (
  <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props}>
    {children}
  </h1>
);

export const H2 = ({ children, className, ...props }: Props) => (
  <h1
    className={cn(
      "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      className,
    )}
    {...props}
  >
    {children}
  </h1>
);

export const H3 = ({ children, className, ...props }: Props) => {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
};

export const H4 = ({ children, className, ...props }: Props) => {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h4>
  );
};
