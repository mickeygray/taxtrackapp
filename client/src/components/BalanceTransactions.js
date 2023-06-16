import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/auth/authContext";
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

//Chart.defaults.global.legend.display = false;
const BalanceTransactions = ({ toggleModal }) => {
 const chartRef = useRef(null);
 ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  {
   id: "uniqueid5",

   afterDraw: function (chart, easing) {
    if (chart.tooltip._active && chart.tooltip._active.length) {
     const activePoint = chart.tooltip._active[0];
     const ctx = chart.ctx;
     const x = activePoint.element.x;
     const topY = chart.scales.y.top;
     const bottomY = chart.scales.y.bottom;
     ctx.save();
     ctx.setLineDash([3, 3]);
     ctx.beginPath();
     ctx.moveTo(x, topY);
     ctx.lineTo(x, bottomY);
     ctx.lineWidth = 2;
     ctx.strokeStyle = "#333";
     ctx.stroke();
     ctx.restore();
    }
   },
  }
 );

 // Create a custom tooltip positioner to put at the bottom of the chart area
 Tooltip.positioners.top = function (items) {
  const pos = Tooltip.positioners.average(items);

  // Happens when nothing is found
  if (pos === false) {
   return false;
  }

  const chart = this.chart;

  return {
   x: chart.chartArea.right,
   y: chart.chartArea.top,
   xAlign: "right",
   yAlign: "top",
  };
 };
 const { profile, logout } = useContext(AuthContext);
 var thresholdValue = 0;
 var thresholdHighArray = new Array(profile.accountTransactions.length).fill(
  thresholdValue
 );
 const data = {
  labels: profile.accountTransactions.map((t) => t.x),
  datasets: [
   {
    label: "Current Balance",
    data: profile.accountTransactions,
    borderColor: "white",
    pointRadius: 0.5,
    fill: false,
    backgroundColor: "#f4f4f4",
    lineTension: 0.4,
    tooltip: {
     callbacks: {
      title: "",
     },
    },
   },
   {
    data: thresholdHighArray,
    borderColor: "red",
    radius: 0,
    borderWidth: 1,
    borderDash: [3, 3], // Specifies the pattern of the dashed line
    fill: false,
   },
  ],
 };

 var line = [
  {
   type: "line",
   mode: "vertical",

   scaleID: "y-axis-0",
   value: -20000,

   borderColor: "#333",
   borderWidth: 1,
  },
 ];
 const options = {
  responsive: true,
  layout: {
   padding: {
    top: 20,
   },
  },
  maintainAspectRatio: false,
  scales: {
   x: {
    display: false,
   },
   y: {
    display: false,
   },
  },
  annotation: {
   annotations: line,
  },
  plugins: {
   legend: {
    display: false,
   },
   tooltip: {
    displayColors: false,
    titleFont: {
     size: 15,
     family: "arial",
    },
    position: "top",
    callbacks: {
     title: function (chart) {
      function addLineBreaks(text) {
       const MAX_CHARACTERS = 50;
       const words = text.split(" ");
       let currentLineLength = 0;

       const result = words.reduce(
        (lines, word) => {
         if (currentLineLength + word.length <= MAX_CHARACTERS) {
          lines[lines.length - 1] += " " + word;
          currentLineLength += word.length + 1; // +1 for the space
         } else {
          lines.push(word);
          currentLineLength = word.length;
         }
         return lines;
        },
        [""]
       );

       return result.join("\n");
      }

      let title = `${addLineBreaks(
       profile.accountTransactions[chart[0].dataIndex].tooltip1
      )} for ${profile.accountTransactions[chart[0].dataIndex].tooltip2}`;
      return title;
     },
     afterTitle: function (chart) {
      const formatter = new Intl.NumberFormat("en-US", {
       style: "currency",
       currency: "USD",

       // These options are needed to round to whole numbers if that's what you want.
       //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
       //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

      let amount = profile.accountTransactions[chart[0].dataIndex].y;
      let date = profile.accountTransactions[chart[0].dataIndex].x;

      let str = ` ${formatter.format(
       profile.startingBalance - amount
      )} savings as of ${date}`;

      return str;
     },
    },
    backgroundColor: "transparent",
   },
  },
 };

 return <Line ref={chartRef} data={data} options={options} />;
};

export default BalanceTransactions;
