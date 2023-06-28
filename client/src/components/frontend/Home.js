import React, { useContext, useState, useEffect, useCallback } from "react";
import AuthContext from "../../context/auth/authContext";
import MessageModal from "./MessageModal";
import BalanceTransactions from "./BalanceTransactions";
import image2 from "../../images/image-2.png";
import downcarat from "../../images/downward-carat-svg.svg";
import image21 from "../../images/image-2-1.png";
import image11 from "../../images/image-11.png";
import clippath from "../../images/clip-path-group.png";
import clippath1 from "../../images/clip-path-group-1.png";
import clippath2 from "../../images/clip-path-group-2.png";
import clippath3 from "../../images/clip-path-group-3.png";
import clippath4 from "../../images/clip-path-group-4.png";
import clippath5 from "../../images/clip-path-group-5.png";
import clippath6 from "../../images/clip-path-group-6.png";
import clippath7 from "../../images/clip-path-group-7.png";
import clippath8 from "../../images/clip-path-group-8.png";
import clippath9 from "../../images/clip-path-group-9.png";
import clippath10 from "../../images/clip-path-group-10.png";
import clippath11 from "../../images/clip-path-group-11.png";
import clippath12 from "../../images/clip-path-group-12.png";
import clippath13 from "../../images/clip-path-group-13.png";
import clippath14 from "../../images/clip-path-group-14.png";
import clippath17 from "../../images/clip-path-group-17.png";
import clippath18 from "../../images/clip-path-group-18.png";
import clippath19 from "../../images/clip-path-group-19.png";
import mdi2 from "../../images/mdi-graph-box-outline-2.svg";
import mdi1 from "../../images/mdi-graph-box-outline-1.svg";
import mdi from "../../images/mdi-graph-box-outline.svg";
import ellipse4 from "../../images/ellipse-4.svg";
import ellipse7 from "../../images/ellipse-7.svg";
import ellipse5 from "../../images/ellipse-5.svg";
import ellipse8 from "../../images/ellipse-8.svg";
import uuidimg from "../../images/e4582498-9d19-4627-a023-6dd5273e15f5.png";
import closingsign from "../../images/closing-signup-updt-202210-2-png.png";
import vector3 from "../../images/vector-3.svg";
import mingcute1 from "../../images/mingcute-arrow-up-fill-1.svg";
import mingcute from "../../images/mingcute-arrow-up-fill.svg";
import amazon from "../../images/ri-amazon-fill.svg";
import rounddry3 from "../../images/ic-round-dry-3.svg";
import rounddry2 from "../../images/ic-round-dry-2.svg";
import rounddry1 from "../../images/ic-round-dry-1.svg";
import rounddry from "../../images/ic-round-dry.svg";
import line3 from "../../images/line-3.svg";
import envoyhome from "../../images/envoy-home-clir-1-png.png";
import footerlife from "../../images/footer-lifestyle-png.png";
const Home = () => {
 const { profile, logout } = useContext(AuthContext);
 console.log(profile);

 const [messageModal, toggleMessageModal] = useState(false);
 const [taskModal, toggleTaskModal] = useState(false);

 const toggleModal = useCallback(() => {
  toggleMessageModal((prevState) => !prevState);
 }, []);

 return (
  <div className='investment-page'>
   <div className='div'>
    <div className='overlap'>
     <div className='frame-4'>
      <img className='img' alt='Image' src={image11} />
      <div className='frame-5'>
       <div className='heading-compound'>Automatic Recurring Investments</div>
       <p className='p'>
        Set your recurring investments and make a habit out of investing. Try $5
        a day.
       </p>
      </div>
     </div>
     <div className='frame-6'>
      <img className='image-2' alt='Image' src={image11} />
      <div className='frame-7'>
       <div className='heading-compound-2'>Automatic Dividend Reinvesting</div>
       <p className='text-wrapper-7'>
        Set your recurring investments and make a habit out of investing. Try $5
        a day.
       </p>
      </div>
     </div>
     <div className='div-homepage'>
      <div className='heading-compound-3'>Your Portfolio</div>
      <div className='overlap-group'>
       <div className='group'>
        <div className='overlap-2'>
         <div className='overlap-group-2'>
          <img className='ellipse' alt='Ellipse' src={ellipse4} />
          <img className='ellipse-2' alt='Ellipse' src={ellipse7} />
          <img className='ellipse-3' alt='Ellipse' src={ellipse5} />
         </div>
         <img className='ellipse-4' alt='Ellipse' src={ellipse8} />
        </div>
       </div>
       <div className='frame-8'>
        <div className='frame-9'>
         <div className='text-wrapper-8'>40%</div>
         <div className='text-wrapper-9'>Bonds</div>
        </div>
        <div className='frame-10'>
         <div className='text-wrapper-10'>60%</div>
         <div className='text-wrapper-11'>Bonds</div>
        </div>
       </div>
      </div>
      <div className='frame-11'>
       <div className='text-wrapper-12'>Risk</div>
       <div className='text-wrapper-13'>Moderate</div>
      </div>
      <div className='frame-12'>
       <div className='text-wrapper-14'>Theme</div>
       <div className='text-wrapper-15'>Core</div>
      </div>
     </div>
    </div>
    <div className='overlap-3'>
     <div className='div-envoy-hero' />
     <div className='overlap-group-wrapper'>
      <div className='overlap-group-3'>
       <img
        className='clip-path-group'
        alt='Clip path group'
        src={clippath19}
       />
       <img
        className='clip-path-group-2'
        alt='Clip path group'
        src={clippath18}
       />
       <img
        className='clip-path-group-3'
        alt='Clip path group'
        src={clippath17}
       />
       <img
        className='clip-path-group-4'
        alt='Clip path group'
        src={clippath14}
       />
       <img
        className='clip-path-group-5'
        alt='Clip path group'
        src={clippath14}
       />
       <img
        className='clip-path-group-6'
        alt='Clip path group'
        src={clippath14}
       />
       <img
        className='clip-path-group-7'
        alt='Clip path group'
        src={clippath13}
       />
       <img
        className='clip-path-group-8'
        alt='Clip path group'
        src={clippath12}
       />
       <img
        className='clip-path-group-9'
        alt='Clip path group'
        src={clippath11}
       />
       <img
        className='clip-path-group-10'
        alt='Clip path group'
        src={clippath10}
       />
       <img
        className='clip-path-group-11'
        alt='Clip path group'
        src={clippath9}
       />
       <img
        className='clip-path-group-12'
        alt='Clip path group'
        src={clippath8}
       />
       <img
        className='clip-path-group-13'
        alt='Clip path group'
        src={clippath7}
       />
       <img
        className='clip-path-group-14'
        alt='Clip path group'
        src={clippath6}
       />
       <img
        className='clip-path-group-15'
        alt='Clip path group'
        src={clippath5}
       />
       <img
        className='clip-path-group-16'
        alt='Clip path group'
        src={clippath4}
       />
       <img
        className='clip-path-group-17'
        alt='Clip path group'
        src={clippath3}
       />
       <img
        className='clip-path-group-18'
        alt='Clip path group'
        src={clippath2}
       />
       <img
        className='clip-path-group-19'
        alt='Clip path group'
        src={clippath1}
       />
       <img
        className='clip-path-group-20'
        alt='Clip path group'
        src={clippath}
       />
       <div className='rectangle' />
       <div className='frame-13'>
        <p className='your-tax-track-value'>
         <span className='span'>Your Tax Track</span>
         <span className='text-wrapper-16'> Value is $200.00</span>
        </p>
        <p className='text-wrapper-17'>
         Invest spare change, invest while you bank, earn bonus investments,
         grow your knowledge and more.
        </p>
        <div className='div-wrapper'>
         <div className='text-wrapper-18'>View Potential</div>
        </div>
       </div>
      </div>
     </div>
     <div className='div-homepage-2'>
      <div className='frame-wrapper'>
       <div className='frame-14'>
        <div className='frame-15'>
         <img className='mdi-graph-box' alt='Mdi graph box' src={mdi2} />
         <div className='text-wrapper-19'>Invest</div>
        </div>
        <div className='text-wrapper-20'>$19,24</div>
       </div>
      </div>
      <div className='frame-16'>
       <div className='frame-17'>
        <div className='frame-18'>
         <img className='mdi-graph-box-2' alt='Mdi graph box' src={mdi1} />
         <div className='text-wrapper-21'>Later</div>
        </div>
        <div className='link-2'>
         <div className='text-wrapper-22'>Set Up</div>
        </div>
       </div>
      </div>
      <div className='frame-19'>
       <div className='frame-20'>
        <div className='frame-21'>
         <img className='mdi-graph-box-3' alt='Mdi graph box' src={mdi} />
         <div className='text-wrapper-23'>Checking</div>
        </div>
        <div className='link-3'>
         <div className='text-wrapper-24'>Set Up</div>
        </div>
       </div>
      </div>
     </div>
    </div>
    <div className='div-homepage-3'>
     <div className='frame-22'>
      <div className='heading-compound-4'>
       <span className='text-wrapper-25'>I </span>
       <span className='text-wrapper-26'>have earned </span>
       <span className='text-wrapper-27'>$30,000</span>
      </div>
      <p className='text-wrapper-28'>Earn bonus investments when you shop.</p>
     </div>
     <div className='frame-23'>
      <div className='image-wrapper'>
       <img className='image-3' alt='Image' src={image21} />
      </div>
      <div className='text-wrapper-29'>$925</div>
     </div>
     <div className='frame-24'>
      <div className='img-wrapper'>
       <img className='image-4' alt='Image' src={image21} />
      </div>
      <div className='text-wrapper-30'>$20%</div>
     </div>
     <div className='frame-25'>
      <div className='e-d-wrapper'>
       <img className='e-d' alt='E d' src={uuidimg} />
      </div>
      <div className='text-wrapper-31'>0.50%</div>
     </div>
     <div className='frame-26'>
      <div className='group-2'>
       <img className='image-5' alt='Image' src={image21} />
      </div>
      <div className='text-wrapper-32'>$2</div>
     </div>
     <div className='frame-27'>
      <div className='group-3'>
       <img className='image-6' alt='Image' src={image21} />
      </div>
      <div className='text-wrapper-33'>$2</div>
     </div>
    </div>
    <div className='frame-28'>
     <div className='frame-29'>
      <div className='frame-30'>
       <p className='heading-compound-5'>
        Earn Bous Investments From Over 12 Brads
       </p>
       <p className='link-all-of-your'>
        Link all of your credit or debit cards
        <br />
        We’ll set aside your spare change from every purchase
        <br />
        And invest the change once it reaches at least $5
       </p>
       <div className='link-4'>
        <div className='text-wrapper-34'>Add Safari extention</div>
       </div>
      </div>
      <img
       className='closing-signup-updt'
       alt='Closing signup updt'
       src={closingsign}
      />
     </div>
     <div className='overlap-wrapper'>
      <div className='overlap-4'>
       <div className='heading-compound-6'>Milestones</div>
       <div className='frame-31'>
        <div className='frame-32'>
         <div className='frame-33'>
          <div className='frame-34'>
           <div className='ellipse-5' />
           <img className='vector' alt='Vector' src={vector3} />
          </div>
          <p className='text-wrapper-35'>
           Tax Track Invest: $100 account balance
          </p>
         </div>
         <div className='frame-35'>
          <div className='frame-36'>
           <div className='text-wrapper-36'>$50</div>
           <div className='text-wrapper-37'>half</div>
          </div>
          <div className='group-4'>
           <div className='ellipse-wrapper'>
            <div className='ellipse-6' />
           </div>
          </div>
         </div>
        </div>
       </div>
       <div className='frame-37'>
        <div className='frame-38'>
         <div className='frame-39'>
          <div className='frame-40'>
           <div className='ellipse-7' />
           <img className='vector-2' alt='Vector' src={vector3} />
          </div>
          <p className='text-wrapper-38'>
           Tax Track Invest: $100 account balance
          </p>
         </div>
         <div className='frame-41'>
          <div className='frame-42'>
           <div className='text-wrapper-39'>$50</div>
           <div className='text-wrapper-40'>half</div>
          </div>
          <div className='group-5'>
           <div className='overlap-group-4'>
            <div className='ellipse-8' />
           </div>
          </div>
         </div>
        </div>
       </div>
       <div className='frame-43'>
        <div className='frame-44'>
         <div className='frame-45'>
          <div className='frame-46'>
           <div className='ellipse-9' />
           <img className='vector-3' alt='Vector' src={vector3} />
          </div>
          <p className='text-wrapper-41'>
           Tax Track Invest: $150 account balance
          </p>
         </div>
         <div className='frame-47'>
          <div className='frame-48'>
           <div className='text-wrapper-42'>$50</div>
           <div className='text-wrapper-43'>Complete</div>
          </div>
          <div className='group-6'>
           <div className='overlap-group-5'>
            <div className='rectangle-2' />
            <div className='rectangle-3' />
            <div className='ellipse-10' />
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
    <div className='div-chart-container-wrapper'>
     <BalanceTransactions />{" "}
    </div>
    <div className='frame-52'>
     <div className='frame-53'>
      <div className='frame-54'>
       <div className='frame-55'>
        <div className='mingcute-arrow-up-wrapper'>
         <img
          className='mingcute-arrow-up'
          alt='Mingcute arrow up'
          src={mingcute1}
         />
        </div>
        <div className='heading-compound-7'>
         Smart Investing Made Acorns-easy
        </div>
       </div>
      </div>
      <div className='frame-56'>
       <div className='frame-57'>
        <div className='banner'>
         <div className='overlap-group-7'>
          <div className='frame-58'>
           <p className='heading-compound-8'>
            Add Stocks To Your Diversified Portfolio.
           </p>
           <div className='frame-59'>
            <div className='text-wrapper-44'>Learn More</div>
            <img
             className='mingcute-arrow-up-2'
             alt='Mingcute arrow up'
             src={mingcute}
            />
           </div>
          </div>
          <div className='ri-amazon-fill-wrapper'>
           <img className='ri-amazon-fill' alt='Ri amazon fill' src={amazon} />
          </div>
         </div>
         <div className='simple-icons-nike-wrapper'>
          <img
           className='simple-icons-nike'
           alt='Simple icons nike'
           src={amazon}
          />
         </div>
         <div className='mask-group-wrapper'>
          <img className='mask-group' alt='Mask group' src={amazon} />
         </div>
         <div className='group-wrapper'>
          <img className='group-7' alt='Group' src={amazon} />
         </div>
         <div className='ic-round-cloud-wrapper'>
          <img className='ic-round-cloud' alt='Ic round cloud' src={amazon} />
         </div>
         <div className='ic-baseline-apple-wrapper'>
          <img
           className='ic-baseline-apple'
           alt='Ic baseline apple'
           src={amazon}
          />
         </div>
        </div>
        <div className='group-8'>
         <div className='overlap-7'>
          <p className='you-invested'>
           <span className='text-wrapper-45'>You Invested </span>
           <span className='text-wrapper-46'>$31.05</span>
           <span className='text-wrapper-47'> in the last 30 days</span>
          </p>
          <div className='frame-60'>
           <div className='text-wrapper-48'>Round-ups</div>
           <div className='text-wrapper-49'>$10.73</div>
          </div>
          <div className='frame-61'>
           <div className='text-wrapper-50'>One-Time</div>
           <div className='text-wrapper-51'>$00.73</div>
          </div>
          <div className='frame-62'>
           <div className='text-wrapper-52'>Recurring</div>
           <div className='text-wrapper-53'>$10.73</div>
          </div>
          <div className='frame-63'>
           <div className='text-wrapper-54'>Dividends</div>
           <div className='text-wrapper-55'>$10.73</div>
          </div>
          <div className='frame-64'>
           <div className='text-wrapper-56'>Earn Rewards</div>
           <div className='text-wrapper-57'>$10.73</div>
          </div>
          <div className='frame-65'>
           <div className='text-wrapper-58'>Referrrals</div>
           <div className='text-wrapper-59'>$10.73</div>
          </div>
         </div>
        </div>
       </div>
       <div className='group-9'>
        <div className='overlap-8'>
         <div className='group-10'>
          <div className='frame-66'>
           <div className='ic-round-dry-wrapper'>
            <img className='ic-round-dry' alt='Ic round dry' src={rounddry3} />
           </div>
           <div className='text-wrapper-60'>How Do Round-Ups Work?</div>
          </div>
          <div className='frame-67'>
           <div className='group-11'>
            <img
             className='ic-round-dry-2'
             alt='Ic round dry'
             src={rounddry2}
            />
           </div>
           <div className='text-wrapper-61'>How Do Round-Ups Work?</div>
          </div>
          <div className='frame-68'>
           <div className='group-12'>
            <img
             className='ic-round-dry-3'
             alt='Ic round dry'
             src={rounddry1}
            />
           </div>
           <div className='text-wrapper-62'>How Do Round-Ups Work?</div>
          </div>
          <div className='frame-69'>
           <div className='group-13'>
            <img className='ic-round-dry-4' alt='Ic round dry' src={rounddry} />
           </div>
           <p className='text-wrapper-63'>
            What Returns Can you expect when you invest in the stock market
           </p>
          </div>
          <img className='line' alt='Line' src={line3} />
          <img className='line-2' alt='Line' src={line3} />
          <img className='line-3' alt='Line' src={line3} />
         </div>
         <div className='text-wrapper-64'>Grow Your Knowledge</div>
        </div>
       </div>
      </div>
     </div>
    </div>
    <div className='frame-70'>
     <p className='text-wrapper-65'>
      We’ll invest $925 into your invest account when you invite 4 of your
      friends to join Tax Track and they invest .
     </p>
     <img className='envoy-home-CLIR' alt='Envoy home CLIR' src={envoyhome} />
     <div className='link-5'>
      <div className='text-wrapper-66'>Share</div>
     </div>
    </div>
    <div className='overlap-9'>
     <div className='frame-71'>
      <div className='heading-compound-9'>Round- Ups</div>
      <div className='frame-72'>
       <div className='frame-73'>
        <div className='frame-74'>
         <div className='frame-75'>
          <div className='text-wrapper-67'>$0</div>
          <div className='text-wrapper-68'>$5.00 until $5.00</div>
         </div>
         <div className='group-14'>
          <div className='overlap-group-8'>
           <div className='ellipse-11' />
          </div>
         </div>
        </div>
       </div>
      </div>
      <p className='text-wrapper-69'>
       Money doesn’t grow on trees. But with compound returns, money can grow on
       itself. It’s a long-term investing principle foundational to how Acorns
       can work for you.
      </p>
      <div className='link-6'>
       <div className='text-wrapper-70'>View my Round-Ups</div>
      </div>
     </div>
    </div>
    <div className='frame-76'>
     <div className='frame-77'>
      <div className='heading-compound-wrapper'>
       <p className='heading-compound-10'>
        You Have $20 In Scheduled Deposits This Month
       </p>
      </div>
      <div className='frame-78'>
       <div className='frame-79'>
        <div className='text-wrapper-71'>Direct deposit</div>
        <div className='text-wrapper-72'>0 paychecks</div>
       </div>
       <div className='text-wrapper-73'>$0</div>
      </div>
      <div className='frame-80'>
       <div className='frame-81'>
        <div className='text-wrapper-74'>Recurring</div>
        <div className='text-wrapper-75'>1 scheduled transfer</div>
       </div>
       <div className='text-wrapper-76'>$20</div>
      </div>
     </div>
     <img
      className='footer-lifestyle-png'
      alt='Footer lifestyle png'
      src={footerlife}
     />
    </div>
   </div>
  </div>
 );
};

export default Home;
