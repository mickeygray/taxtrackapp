import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../context/auth/authContext";
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

const BalanceTransactions = ({ toggleModal }) => {
 const chartRef = useRef(null);
 let tooltipRef = useRef(null);

 ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
 );

 const { profile } = useContext(AuthContext);

 const plugin = {
  id: "corsair",
  defaults: {
   width: 1,
   color: "#FF4949",
   dash: [3, 3],
  },
  afterInit: (chart, args, opts) => {
   chart.corsair = {
    x: 0,
    y: 0,
   };
  },
  afterEvent: (chart, args) => {
   const { inChartArea } = args;
   const { type, x, y } = args.event;

   chart.corsair = { x, y, draw: inChartArea };
   chart.draw();
  },
  beforeDatasetsDraw: (chart, args, opts) => {
   const { ctx } = chart;
   const { top, bottom, left, right } = chart.chartArea;
   const { x, y, draw } = chart.corsair;
   if (!draw) return;

   ctx.save();

   ctx.beginPath();
   ctx.lineWidth = opts.width;
   ctx.strokeStyle = opts.color;
   ctx.setLineDash(opts.dash);
   ctx.moveTo(x, bottom);
   ctx.lineTo(x, top);
   ctx.stroke();

   ctx.restore();
  },
 };

 const handleTooltip = (tooltipModel) => {
  const tooltipEl = tooltipRef.current;
  tooltipEl.style.display = "block";

  const targetValue = parseFloat(tooltipModel.dataPoints[0].raw.y);

  console.log(tooltipModel);
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

  const formatCurrency = (value) => {
   return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
   });
  };
  const animateNumberTabulator = (timestamp, index) => {
   const progress = Math.min((timestamp - startTime) / duration, 1);
   const currentValue = startValue + (targetValue - startValue) * progress;

   const wholePart = Math.floor(currentValue);
   const decimalPart = (currentValue % 1).toFixed(2).substring(1);

   const wholeDigits = formatCurrency(wholePart)
    .replace(/[^0-9.-]+/g, "")
    .split("")
    .join("");

   const animatedWholeDigits = wholeDigits !== "" ? wholeDigits : "0";

   const animatedDecimalPart = `<span class="roll-down roll-up bounce">${decimalPart}</span>`;
   const wholeDigitsOnly = animatedWholeDigits.replace(/\.00$/, ""); // Remove non-digit characters
   const decimalDigitsOnly = animatedDecimalPart.replace(/\D/g, ""); //
   const animatedValue = parseFloat(
    `${wholeDigitsOnly}.${decimalDigitsOnly}`
   ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
   });

   tooltipEl.innerHTML = `<div style="margin-left: 100px;">
        <h2>Current Balance: ${animatedValue}</h2>
        <h3><i class="fas fa-question-circle"></i> ${tooltipModel.dataPoints[0].raw.tooltip1} for ${tooltipModel.dataPoints[0].raw.tooltip2}</h3>
        <h4><i class="fas fa-calendar-check"></i> ${tooltipModel.dataPoints[0].raw.x}</h4>
      </div>`;

   if (progress < 1) {
    requestAnimationFrame((timestamp) =>
     animateNumberTabulator(timestamp, index)
    );
   } else {
    tooltipEl.innerHTML = `<div style="margin-left: 100px;">
          <h2>Current Balance: ${formatCurrency(targetValue)}</h2>
          <h3><i class="fas fa-question-circle"></i> ${
           tooltipModel.dataPoints[0].raw.tooltip1
          } for ${tooltipModel.dataPoints[0].raw.tooltip2}</h3>
          <h4><i class="fas fa-calendar-check"></i> ${
           tooltipModel.dataPoints[0].raw.x
          }</h4>
        </div>`;
   }
  };

  const startTime = performance.now();
  const duration = 2000; // Animation duration in milliseconds

  requestAnimationFrame((timestamp) => animateNumberTabulator(timestamp, 0));
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
    fill: false,
    backgroundColor: "transparent",
    borderWidth: 3,
    pointRadius: 20,
    radius: 20,
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
    backgroundColor: "transparent",
    pointBorderColor: "transparent",
    radius: 0,
    borderWidth: 1,
    borderDash: [3, 3], // Specifies the pattern of the dashed line
    fill: false,
   },
  ],
 };

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
  plugins: {
   legend: {
    display: false,
   },
   corsair: {
    color: "black",
   },
   tooltip: {
    enabled: false,
    external: (context) => {
     handleTooltip(context.tooltip);
    },
   },
  },
  interaction: {
   mode: "index",
   intersect: false,
  },
  elements: {
   line: {
    borderWidth: 1,
    borderColor: "#777",
    backgroundColor: "rgba(0,0,0,0.4)",
   },
  },
  onAfterDraw: function (chart) {
   const ctx = chart.ctx;
   const xScale = chart.scales.x;
   const yScale = chart.scales.y;
   const dataset = chart.data.datasets[0];
   const meta = chart.getDatasetMeta(0);

   ctx.save();
   ctx.setLineDash([3, 3]);
   ctx.lineWidth = 2;
   ctx.strokeStyle = "#333";

   meta.data.forEach((element, index) => {
    if (index > 0) {
     const startX = xScale.getPixelForValue(dataset.data[index - 1].x);
     const startY = yScale.getPixelForValue(dataset.data[index - 1].y);
     const endX = xScale.getPixelForValue(dataset.data[index].x);

     ctx.beginPath();
     ctx.moveTo(startX, startY);
     ctx.lineTo(endX, startY);
     ctx.stroke();
    }
   });

   ctx.restore();
  },
 };

 const latestTransaction = profile.accountTransactions.reduce(
  (latest, transaction) => {
   const transactionDate = Date.parse(transaction.x);

   if (!latest || transactionDate > latest.date) {
    return {
     ...transaction,
     date: transactionDate,
    };
   }

   return latest;
  },
  null
 );

 return (
  <div>
   {tooltipRef.current === null && (
    <div className='custom-tooltip'>
     <div style={{ marginLeft: "100px" }}>
      <h2>
       Current Balance: $
       {profile.currentBalance
        ? profile.currentBalance.toLocaleString()
        : profile.startingBalance.toLocaleString()}
      </h2>
      <h3>
       <i className='fas fa-question-circle'></i> {latestTransaction.tooltip1}{" "}
       for {latestTransaction.tooltip2}
      </h3>
      <h4>
       <i className='fas fa-calendar-check'></i> {latestTransaction.x}
      </h4>
     </div>
    </div>
   )}
   <div id='custom-tooltip' className='custom-tooltip'></div>
   <Line data={data} options={options} plugins={[plugin]} ref={chartRef} />
  </div>
 );
};

export default BalanceTransactions;
