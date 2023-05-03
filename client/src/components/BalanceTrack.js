import React, { useState } from "react";
import styled from "styled-components";
import bitmaskToPath from "@pictogrammers/bitmask-to-svg";
const BalanceTrack = ({ labels, stoneArr, transArr, profile }) => {
 const [incremententedTransactions, setIntrementedTransactions] = useState(
  transArr.map((m, i) => {
   const obj = {
    date: m.date,
    amount: transArr.slice(0, i).reduce((a, b) => a + b, 0),
   };
   return obj;
  })
 );

 const [totalRange, setTotalRange] = useState(
  [
   0,
   (Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) / 9).toFixed(0) *
    1,
   (Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) / 9).toFixed(0) *
    2,
   (Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) / 9).toFixed(0) *
    3,
   (Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) / 9).toFixed(0) *
    4,
   (Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) / 9).toFixed(0) *
    5,
   (Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) / 9).toFixed(0) *
    6,
   (Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) / 9).toFixed(0) *
    7,
   (Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) / 9).toFixed(0) *
    8,
   Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")),
  ].reverse()
 );

 console.log(transArr);

 console.log(labels);

 const Card = (
  <VectorTooltip>
   <TooltipContent>
    <TooltipVector>
     <BottomGroup>
      <BottomVectorGroup>
       <BottomVector src='https://filie.rendit.io/n/Dnp0scaYbnKK94eYiC2C.svg' />
       <BottomVector1 src='https://file.rendit.io/n/jswgg0AXumZ1eYdG4hvQ.svg' />
       <BottomVector2 src='https://fle.rendit.io/n/fnL7adGHCRb12wVJG1rh.svg' />
       <BottomVector3 src='https://file.rendit.io/n/d2ZfONkmu8d8uOK4I4Eq.svg' />
      </BottomVectorGroup>
      <TooltipVectorGear src='https://file.rendit.io/n/vVauFwuKSRgrRbAgLarI.svg' />
     </BottomGroup>
     <TooltipVectorVector src='https://file.rendit.io/n/1IdeGujabZ8gSW9mOf6t.svg' />
     <TooltipGroup>
      <VectorStatsIcon src='https://file.rendit.io/n/Nf8NNf66oq26Mx0ycfYv.svg' />
      <VectorGraphIcon src='https://file.rendit.io/n/QCwfKdc11bSUrhZ00kY3.svg' />
      <VectorGrowthIcon src='https://file.rendit.io/n/DEfP1Bk0yaTznOuHtdBF.svg' />
      <VectorStatsIcon src='https://file.rendit.io/n/2l6s5dyuL1Y6OPe1xfmo.svg' />
     </TooltipGroup>
    </TooltipVector>
    <TooltipText>This is text</TooltipText>
    <StatsText>some text here</StatsText>
   </TooltipContent>
   <Bottomcenter src='https://file.rendit.io/n/gXxDVJ8ZNdGIEDrYgAyo.svg' />
  </VectorTooltip>
 );

 return (
  <CRootRootRoot>
   <Group>
    <PriceGroup>
     {totalRange.map((m) => (
      <Price2>{m}</Price2>
     ))}
    </PriceGroup>
    <VectorGroup>
     <DecorDivider />

     <DecorDivider1 />

     <DecorDivider2 />
     <ScreenshotLine src='https://file.rendit.io/n/9CYcLoNIDJGO2k97cjES.svg' />
     <EllipseLine>
      <StatisticsEllipse src='https://file.rendit.io/n/Yk0VOMJW9HO5y4AhWj01.svg' />
     </EllipseLine>
    </VectorGroup>
   </Group>
   <PageDivider />

   <CalendarGroup className=''>
    {labels.map((data) => (
     <Price className='p-1'>{data.childText}</Price>
    ))}
   </CalendarGroup>
  </CRootRootRoot>
 );
};
export default BalanceTrack;
const Price = styled.div`
 align-self: flex-start;
 color: #ffffff;
 font-size: 15px;
 font-family: Inter;
 line-height: 21px;
 white-space: nowrap;
 box-sizing: border-box;
`;
const Price2 = styled.div`
 align-self: flex-end;
 color: #ffffff;
 font-size: 15px;
 font-family: Inter;
 line-height: 21px;
 white-space: nowrap;
 box-sizing: border-box;
`;
const VectorStatsIcon = styled.img`
 width: 50.01%;
 min-width: 0px;
 max-width: 100%;
 min-height: 0px;
 align-self: flex-start;
 box-sizing: border-box;
`;
const CRootRootRoot = styled.div`
 gap: 12.7px;
 display: flex;
 flex-direction: column;
 justify-content: flex-end;
 padding: 77px 32px 43px 32px;
 box-sizing: border-box;
 background-color: #3b9c00;
`;
const Group = styled.div`
 width: 98.07%;
 gap: 34px;
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-self: flex-start;
 box-sizing: border-box;
`;
const PriceGroup = styled.div`
 width: 3.9%;
 gap: 39px;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-self: flex-start;
 margin: 0px 0px 6px 0px;
 box-sizing: border-box;
`;
const VectorGroup = styled.div`
 width: 96.1%;
 position: relative;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-self: flex-end;
 padding: 69px 629px 206px 629px;
 border-width: 1px 0px 0px 0px;
 border-top-color: transparent;
 border-top-style: solid;
 box-sizing: border-box;
`;
const DecorDivider = styled.div`
 width: 99.86%;
 height: 1px;
 left: 2px;
 top: 100.30000305175781px;
 position: absolute;
 border-width: 1px 0px 0px 0px;
 border-radius: 0.5px;
 border-style: solid;
 border-color: rgba(243, 243, 243, 0.22);
 box-sizing: border-box;
`;
const DecorDivider1 = styled.div`
 width: 99.86%;
 height: 1px;
 left: 2px;
 top: 197.10000610351562px;
 position: absolute;
 border-width: 1px 0px 0px 0px;
 border-radius: 0.5px;
 border-style: solid;
 border-color: rgba(243, 243, 243, 0.22);
 box-sizing: border-box;
`;
const DecorDivider2 = styled.div`
 width: 99.86%;
 height: 1px;
 left: 2px;
 top: 293.9000244140625px;
 position: absolute;
 border-width: 1px 0px 0px 0px;
 border-radius: 0.5px;
 border-style: solid;
 border-color: rgba(243, 243, 243, 0.22);
 box-sizing: border-box;
`;
const ScreenshotLine = styled.img`
 width: 253px;
 min-width: 0px;
 height: 103px;
 min-height: 0px;
 left: 0px;
 top: 0px;
 position: absolute;
 box-sizing: border-box;
`;
const EllipseLine = styled.div`
 width: 1062px;
 height: 211px;
 left: 319px;
 top: 167px;
 position: absolute;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 padding: 9px 350px 172px 350px;
 box-sizing: border-box;
 background-size: cover;
 background-image: url("https://file.rendit.io/n/ZT3Ws0ARHnao9RURWBpg.svg");
`;
const StatisticsEllipse = styled.img`
 width: 8.29%;
 min-width: 0px;
 max-width: 100%;
 min-height: 0px;
 align-self: flex-start;
 box-sizing: border-box;
`;
const VectorTooltip = styled.div`
 width: 110px;
 position: relative;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-self: flex-start;
 padding: 0px 0px 6px 0px;
 border-radius: 8px;
 box-sizing: border-box;
 background-position: 50% 50%;
 background-size: cover;
 background-blend-mode: ;
 background-image: ;
 box-shadow: 0px 4px 6px -2px rgba(16, 24, 40, 0.03),
  0px 12px 16px -4px rgba(16, 24, 40, 0.08);
`;
const TooltipContent = styled.div`
 width: 100%;
 position: relative;
 gap: 2px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-self: flex-start;
 padding: 12px 16px;
 border-radius: 8px;
 box-sizing: border-box;
 background-color: #ffffff;
`;
const TooltipVector = styled.div`
 width: 20px;
 gap: 0.32px;
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-self: center;
 margin: 0px 0px 6px 0px;
 box-sizing: border-box;
 background-size: cover;
 background-image: url("https://file.rendit.io/n/gFUGscwGHz6KIZrOeIqF.svg");
`;
const BottomGroup = styled.div`
 width: 51.67%;
 gap: 1.74px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-self: flex-start;
 margin: 0px 0.98px 3.91px 0px;
 box-sizing: border-box;
`;
const BottomVectorGroup = styled.div`
 width: 100%;
 position: relative;
 display: flex;
 flex-direction: column;
 justify-content: flex-end;
 align-self: flex-start;
 padding: 5.22px 0px 0px 0px;
 box-sizing: border-box;
`;
const BottomVector = styled.img`
 width: 0.3%;
 min-width: 0px;
 height: 0.03px;
 min-height: 0px;
 left: 9.973388671875px;
 top: 9.972724914550781px;
 position: absolute;
 box-sizing: border-box;
`;
const BottomVector1 = styled.img`
 width: 100%;
 min-width: 0px;
 height: 10px;
 min-height: 0px;
 left: 0px;
 top: 0px;
 position: absolute;
 box-sizing: border-box;
`;
const BottomVector2 = styled.img`
 width: 87%;
 min-width: 0px;
 height: 8.7px;
 min-height: 0px;
 left: 1.3046875px;
 top: 1.3039493560791016px;
 position: absolute;
 box-sizing: border-box;
`;
const BottomVector3 = styled.img`
 width: 47.8%;
 min-width: 0px;
 max-width: 100%;
 min-height: 0px;
 position: relative;
 align-self: flex-end;
 box-sizing: border-box;
`;
const TooltipVectorGear = styled.img`
 width: 44.6%;
 min-width: 0px;
 max-width: 100%;
 min-height: 0px;
 align-self: flex-end;
 margin: 0px 1.74px 0px 0px;
 box-sizing: border-box;
`;
const TooltipVectorVector = styled.img`
 width: 11.52%;
 min-width: 0px;
 max-width: 100%;
 min-height: 0px;
 align-self: flex-start;
 margin: 7.83px 0px 0px 0px;
 box-sizing: border-box;
`;
const TooltipGroup = styled.div`
 width: 23.04%;
 gap: 0.43px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-self: flex-end;
 margin: 0px 0px 3.91px 0px;
 box-sizing: border-box;
`;
const VectorGraphIcon = styled.img`
 width: 50.01%;
 min-width: 0px;
 max-width: 100%;
 min-height: 0px;
 align-self: flex-end;
 margin: 0px 0px 0.44px 0px;
 box-sizing: border-box;
`;
const VectorGrowthIcon = styled.img`
 width: 41.04%;
 min-width: 0px;
 max-width: 100%;
 min-height: 0px;
 align-self: flex-start;
 margin: 0px 0px 1.74px 0.84px;
 box-sizing: border-box;
`;
const TooltipText = styled.div`
 width: 100%;
 align-self: center;
 font-size: 13px;
 font-weight: 500;
 font-family: Satoshi;
 line-height: 24px;
 text-align: center;
 box-sizing: border-box;
`;
const StatsText = styled.div`
 align-self: center;
 color: #475466;
 font-size: 11px;
 font-family: Inter;
 line-height: 18px;
 text-align: center;
 white-space: nowrap;
 box-sizing: border-box;
`;
const Bottomcenter = styled.img`
 width: 12.82%;
 min-width: 0px;
 height: 8.07px;
 min-height: 0px;
 left: 39.441650390625px;
 top: 93.48529052734375px;
 position: absolute;
 box-sizing: border-box;
 transform: rotate(45deg);
 transform-origin: 0px 0px;
`;
const PageDivider = styled.div`
 width: 92.01%;
 height: 1px;
 flex-shrink: 0;
 align-self: flex-end;
 margin: 0px 30px 6.6px 0px;
 border-width: 1px 0px 0px 0px;
 border-radius: 0.5px;
 border-style: solid;
 border-color: rgba(243, 243, 243, 0.22);
 box-sizing: border-box;
`;
const FooterPrice = styled.div`
 align-self: flex-start;
 margin: 0px 0px 26.3px 7px;
 color: #ffffff;
 font-size: 15px;
 font-family: Inter;
 line-height: 21px;
 text-align: right;
 white-space: nowrap;
 box-sizing: border-box;
`;
const FooterGroups = styled.div`
 width: 94.97%;
 gap: 36px;
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-self: flex-end;
 margin: 0px 30px 23.3px 0px;
 box-sizing: border-box;
`;
const FooterDecorDivider = styled.div`
 width: 99.3%;
 height: 1px;
 align-self: flex-end;
 margin: 0px 0px 3.5px 0px;
 border-width: 1px 0px 0px 0px;
 border-radius: 0.5px;
 border-style: solid;
 border-color: rgba(243, 243, 243, 0.22);
 box-sizing: border-box;
`;
const CalendarGroup = styled.div`
 width: 92.01%;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-self: flex-end;
 margin: 0px 30px 0px 0px;
 box-sizing: border-box;
`;
