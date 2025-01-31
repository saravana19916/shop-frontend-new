"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Tooltip = ({ children, text, position = "top" }) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div 
      className=""
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className={`absolute z-50 px-3 py-1 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap capitalize`}
        >
          {text}
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;