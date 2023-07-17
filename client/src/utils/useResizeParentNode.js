import { useEffect, useState } from "react";

const useResizeParentNode = (ref, width, height) => {
 const [parentNode, setParentNode] = useState(null);

 useEffect(() => {
  if (ref.current) {
   setParentNode(ref.current.parentNode);
  }
 }, [ref]);

 useEffect(() => {
  const resizeParentNode = () => {
   if (parentNode) {
    parentNode.style.width = `${width}px`;
    parentNode.style.height = `${height}px`;
   }
  };

  if (parentNode) {
   resizeParentNode();
  }

  const handleResize = () => {
   resizeParentNode();
  };

  window.addEventListener("resize", handleResize);

  return () => {
   window.removeEventListener("resize", handleResize);
  };
 }, [parentNode, width, height]);

 return parentNode;
};

export default useResizeParentNode;
