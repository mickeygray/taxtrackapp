import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
const Burger = () => {
 var styles = {
  bmBurgerButton: {
   position: "fixed",
   width: "36px",
   height: "30px",
   left: "36px",
   top: "36px",
  },
  bmBurgerBars: {
   background: "#373a47",
  },
  bmBurgerBarsHover: {
   background: "#a90000",
  },
  bmCrossButton: {
   height: "24px",
   width: "24px",
  },
  bmCross: {
   background: "#bdc3c7",
  },
  bmMenuWrap: {
   position: "fixed",
   height: "100%",
  },
  bmMenu: {
   background: "#373a47",
   padding: "2.5em 1.5em 0",
   fontSize: "1.15em",
  },
  bmMorphShape: {
   fill: "#373a47",
  },
  bmItemList: {
   color: "#b8b7ad",
   padding: "0.8em",
  },
  bmItem: {
   display: "inline-block",
  },
  bmOverlay: {
   background: "rgba(0, 0, 0, 0.3)",
  },
 };

 return (
  <Menu styles={styles}>
   <ul>
    <li>
     {" "}
     <Link className='menu-item' to='/'>
      Home
     </Link>
    </li>
    <li>
     {" "}
     <Link className='menu-item' to='/balancetransactions'>
      Path to Zero
     </Link>
    </li>
    <li>
     {" "}
     <Link className='menu-item' to='/taxreturns'>
      Tax Returns
     </Link>
    </li>
    <li>
     {" "}
     <Link className='menu-item' to='/taxplanning'>
      Tax Planning
     </Link>
    </li>
   </ul>
  </Menu>
 );
};

export default Burger;
