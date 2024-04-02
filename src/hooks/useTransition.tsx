import { useEffect, useState } from "react";

const useTransition = (isDropped: boolean) => {
  const [animationStyle, setAnimationStyle] = useState({
    display: "none",
    opacity: 0,
    transform: "translateY(-20px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  });

  useEffect(() => {
    if (isDropped) {
      setAnimationStyle({
        display: "block",
        opacity: 0,
        transform: "translateY(-20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      });

      setTimeout(() => {
        setAnimationStyle((prevStyle) => ({
          ...prevStyle,
          opacity: 1,
          transform: "translateY(0)",
        }));
      }, 10);
    } else {
      setAnimationStyle((prevStyle) => ({
        ...prevStyle,
        opacity: 0,
        transform: "translateY(-20px)",
      }));

      setTimeout(() => {
        setAnimationStyle((prevStyle) => ({
          ...prevStyle,
          display: "none",
        }));
      }, 500);
    }
  }, [isDropped]);

  return animationStyle;
};

export default useTransition;
