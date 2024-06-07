import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      green: ["bg-green-500", "text-white", "hover:bg-green-600"],
      red: ["bg-red-500", "text-white", "hover:bg-red-600"],
    },
    size: {
      default: ["px-8", "py-3", "rounded-lg", "text-white", "font-semibold"],
      small: ["px-4", "py-2", "rounded-md", "text-white", "font-semibold"],
      large: ["px-12", "py-4", "rounded-xl", "text-white", "font-semibold"],
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}
