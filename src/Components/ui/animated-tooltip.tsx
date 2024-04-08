"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // Pour ajuster la position de la tooltip basée sur le mouvement de la souris
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // Ajuster la valeur de x pour la rotation/transformation
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className=" relative group"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-12 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
            >
              <div className="font-bold text-white relative z-30 text-base">
                {item.firstName} {item.lastName}
              </div>
              <div className="text-white text-xs">{/* UN TRUCK ICI  */}</div>
            </motion.div>
          )}
          <img
            onMouseMove={handleMouseMove}
            src={item.image}
            className="object-cover m-0 p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
            style={{ width: "55px", height: "55px" }} // Taille fixe pour les images, ajustez selon vos besoins
          />
        </div>
      ))}
    </>
  );
};
