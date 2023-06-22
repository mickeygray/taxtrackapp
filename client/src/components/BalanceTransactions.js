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
 const [isDragging, setIsDragging] = useState(false);
 const chartRef = useRef(null);
 let tooltipRef = useRef(null);

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
 function addLineBreaks(text) {
  const MAX_CHARACTERS = 65;
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
 const handleTooltip = (tooltipModel) => {
  const tooltipEl = tooltipRef.current;
  tooltipEl.style.display = "block";

  const targetValue = parseFloat(tooltipModel.dataPoints[0].raw.y);
  let startValue =
   tooltipModel.dataPoints[0].dataIndex > 0
    ? parseFloat(
       tooltipModel.dataPoints[0].dataset.data[
        tooltipModel.dataPoints[0].dataIndex - 1
       ].y
      )
    : parseFloat(
       tooltipModel.dataPoints[0].dataset.data[
        tooltipModel.dataPoints[0].dataIndex + 1
       ].y
      );
  startValue = isNaN(startValue) ? 0 : startValue;

  const animateNumberTabulator = (timestamp) => {
   const progress = Math.min((timestamp - startTime) / duration, 1);
   const easingProgress = Math.sqrt(progress); // Adjust the easing function as needed
   const currentValue = Math.floor(
    startValue + (targetValue - startValue) * easingProgress
   );
   tooltipEl.innerHTML = `<div style="margin-left: 100px;">
      <h2>Current Balance: $ ${parseFloat(currentValue).toLocaleString(
       "en-US",
       { style: "currency", currency: "USD" }
      )}</h2>
      <h3><i class="fas fa-question-circle"></i> ${
       tooltipModel.dataPoints[0].raw.tooltip1
      } for ${tooltipModel.dataPoints[0].raw.tooltip2}</h3>
      <h3><i class="fas fa-calendar-check"></i> ${
       tooltipModel.dataPoints[0].raw.x
      }</h3>
    </div>`;

   if (progress < 1) {
    requestAnimationFrame(animateNumberTabulator);
   } else {
    tooltipEl.innerHTML = `<div style="margin-left: 100px;">
        <h2>Current Balance: $ ${parseFloat(targetValue).toLocaleString(
         "en-US",
         { style: "currency", currency: "USD" }
        )}</h2>
        <h3><i class="fas fa-question-circle"></i> ${
         tooltipModel.dataPoints[0].raw.tooltip1
        } for ${tooltipModel.dataPoints[0].raw.tooltip2}</h3>
        <h3><i class="fas fa-calendar-check"></i> ${
         tooltipModel.dataPoints[0].raw.x
        }</h3>
      </div>`;
   }
  };

  const startTime = performance.now();
  const duration = 1000; // Animation duration in milliseconds (adjust as needed)

  requestAnimationFrame(animateNumberTabulator);
 };

 var thresholdValue = 0;
 var thresholdHighArray = new Array(profile.accountTransactions.length).fill(
  thresholdValue
 );

 useEffect(() => {
  tooltipRef.current = document.getElementById("custom-tooltip");
 }, []);

 const data = {
  labels: profile.accountTransactions.map((t) => t.x),
  datasets: [
   {
    label: "Current Balance",
    data: profile.accountTransactions,
    borderColor: "white",
    radius: ".1",
    fill: false,
    backgroundColor: "transparent",
    borderWidth: 3,
    pointRadius: 80,
    radius: 80,
    pointBorderColor: "transparent",
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
    enabled: false,
    external: (context) => {
     handleTooltip(context.tooltip);
    },
   },
   /*
   tooltip: {
    displayColors: false,
    mode: "x",
    titleFont: {
     size: 20,
     family: "arial",
    },
    bodyFont: {
     size: 20,
     family: "arial",
    },
    position: "top",
    callbacks: {
     title: function (chart) {
      function addLineBreaks(text) {
       const MAX_CHARACTERS = 65;
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
   },*/
  },
 };

 console.log(chartRef.current);
 return (
  <div>
   <div id='custom-tooltip' className='custom-tooltip'></div>
   <Line data={data} options={options} ref={chartRef} />
  </div>
 );
};

export default BalanceTransactions;
