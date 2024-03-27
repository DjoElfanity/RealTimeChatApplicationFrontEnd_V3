"use client";
import { AnimatedTooltip } from "../ui/animated-tooltip";
const user = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
];

export function IconeUser() {
  return (
    <div className=" flex items-center justify-center  ">
      <AnimatedTooltip items={user} />
    </div>
  );
}
