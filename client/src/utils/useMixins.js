import { css } from "styled-components";

const useMixins = () => {
 const colors = css`
  --color-black: #121212;
  --color-logo-green: #77d215;
  --color-light: #fff;
  --color-error: #e74c3c;
  --color-warning: #f1c40f;
  --color-info: #3498db;
  --color-success: #07bc0c;
  --color-dark: #004900;
  --color-primary-green: #74c947;
  --color-primary-purple: #6944ff;
  --color-solid-slate: #191919;
  --color-dark-grey: #323436;
  --color-solid-stone: #6f6f6f;
  --color-light-grey: #767676;
  --color-ivory: #f5f5f5;
  --color-ivory-light: #f9f9f9;
  --color-off-white: #fcfcfc;
  --color-stone-light: #cccfcf;
  --color-white: #fff;
  --color-ecru: #f3f0e6;
  --color-ice-blue: #e5ecee;
 --color-light-tan: rgb(244, 231, 212);
};`;

 const formControlMixin = css`
  width: 100%;
  height: 40px;
  padding: 8px;
  font-size: 0.875rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
  transition: box-shadow 0.3s ease;

  & label {
   position: absolute;
   top: -5px;
   left: -5px;
   font-size: 1rem;
  }

  & legend {
   font-size: 0.6rem;
  }

  &:hover {
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
 `;

 const containerMixin = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
 `;

 const heroMixin = css`
  position: relative;
  height: calc(100vh - 100px);
  overflow: hidden;
  width: 100vw;
  margin-top: -20px;
 `;

 const heroImageMixin = css`
  position: absolute;
  top: -100px;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  object-fit: cover;
  z-index: -1;
 `;

 const heroContentMixin = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
 `;

 const heroTitleMixin = css`
  font-size: 36px;
  margin-bottom: 20px;
 `;

 const heroSubtitleMixin = css`
  font-size: 18px;
  margin-bottom: 30px;
 `;

 const heroButtonMixin = css`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &.MuiButtonBase-root {
   pointer-events: none;
   color: #fff;

   border-radius: 20px;
   font-size: 16px;
   padding: 10px 20px;
  }
 `;

 return {
  formControlMixin,
  colors,
  containerMixin,
  heroMixin,
  heroImageMixin,
  heroContentMixin,
  heroTitleMixin,
  heroSubtitleMixin,
  heroButtonMixin,
 };
};

export default useMixins;
