import * as React from "react";
import { cn } from "@/lib/utils";

const cardVariants = {
  base: "rounded-3xl bg-card shadow-sm border border-gray-100 flex flex-col",
  padding: "p-5 lg:p-4 2xl:p-7",
  gap: "gap-4 lg:gap-6",
};

const createCardComponent = <T extends React.ElementType>(
  element: T,
  baseClassName: string,
  displayName: string
) => {
  const Component = React.forwardRef<
    React.ElementRef<T>,
    React.ComponentPropsWithoutRef<T>
  >(({ className, ...props }, ref) => {
    const Comp: React.ElementType = element;
    return (
      <Comp ref={ref} className={cn(baseClassName, className)} {...props} />
    );
  });
  Component.displayName = displayName;
  return Component;
};

const Card = createCardComponent(
  "div",
  cn(cardVariants.base, cardVariants.padding, cardVariants.gap),
  "Card"
);

const CardHeader = createCardComponent(
  "div",
  "flex flex-col gap-2",
  "CardHeader"
);

const CardFooter = createCardComponent(
  "div",
  "flex items-center",
  "CardFooter"
);

const CardTitle = createCardComponent(
  "h3",
  "text-sm font-semibold leading-none tracking-tight 2xl:text-xl",
  "CardTitle"
);

const CardDescription = createCardComponent(
  "p",
  "text-sm text-muted-foreground",
  "CardDescription"
);

const CardContent = createCardComponent("div", "", "CardContent");

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
