export const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95
    },
    in: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    out: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  export const cardHover = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };