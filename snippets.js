const auto = {
 northeastRegion: {
  states: ["CT", "ME", "MA", "NH", "NJ", "NY", "PA", "RI", "VT"],
  oneCar: 927,
  twoCars: 1854,
 },
 midwestRegion: {
  states: [
   "IL",
   "IN",
   "IA",
   "KS",
   "MI",
   "MN",
   "MO",
   "NE",
   "ND",
   "OH",
   "SD",
   "WI",
  ],
  oneCar: 854,
  twoCars: 1708,
 },
 southRegion: {
  states: [
   "AL",
   "AR",
   "DE",
   "FL",
   "GA",
   "KY",
   "LA",
   "MD",
   "MS",
   "NC",
   "OK",
   "SC",
   "TN",
   "TX",
   "VA",
   "WV",
  ],
  oneCar: 871,
  twoCars: 1742,
 },
 westRegion: {
  states: [
   "AK",
   "AZ",
   "CA",
   "CO",
   "HI",
   "ID",
   "MT",
   "NV",
   "NM",
   "OR",
   "UT",
   "WA",
   "WY",
  ],
  oneCar: 893,
  twoCars: 1786,
 },
};

const housing = [
 {
  state: "AL",
  familyOf1: 1310.02,
  familyOf2: 1542.86,
  familyOf3: 1624.76,
  familyOf4: 1811.91,
  familyOf5: 1842.52,
 },
 {
  state: "AK",
  familyOf1: 1702,
  familyOf2: 1998,
  familyOf3: 2103,
  familyOf4: 2344,
  familyOf5: 2380,
 },
 {
  state: "AZ",
  familyOf1: 1460,
  familyOf2: 1716,
  familyOf3: 1805,
  familyOf4: 2010,
  familyOf5: 2040,
 },
 {
  state: "AR",
  familyOf1: 1288.83,
  familyOf2: 1512.49,
  familyOf3: 1592.59,
  familyOf4: 1779.67,
  familyOf5: 1807.98,
 },
 {
  state: "CA",
  familyOf1: 2384.78,
  familyOf2: 2802.58,
  familyOf3: 2954.31,
  familyOf4: 3291.41,
  familyOf5: 3343.86,
 },
 {
  state: "CO",
  familyOf1: 1737.23,
  familyOf2: 2039.08,
  familyOf3: 2149.24,
  familyOf4: 2395.79,
  familyOf5: 2437.58,
 },
 {
  state: "CT",
  familyOf1: 2384.17,
  familyOf2: 2802.75,
  familyOf3: 2952.33,
  familyOf4: 3284.17,
  familyOf5: 3332.33,
 },
 {
  state: "DE",
  familyOf1: 1758.33,
  familyOf2: 2067.33,
  familyOf3: 2176.33,
  familyOf4: 2425.67,
  familyOf5: 2464,
 },
 {
  state: "DC",
  familyOf1: 3336.8,
  familyOf2: 3919.2,
  familyOf3: 4123.2,
  familyOf4: 4596.8,
  familyOf5: 4666.4,
 },
 {
  state: "HI",
  familyOf1: 2204,
  familyOf2: 2599,
  familyOf3: 2738,
  familyOf4: 3049,
  familyOf5: 3093,
 },
 {
  state: "FL",
  familyOf1: 1531.81,
  familyOf2: 1800.72,
  familyOf3: 1895.17,
  familyOf4: 2111.56,
  familyOf5: 2145.67,
 },
 {
  state: "GA",
  familyOf1: 1473,
  familyOf2: 1732,
  familyOf3: 1825,
  familyOf4: 2032,
  familyOf5: 2067,
 },
 {
  state: "ID",
  familyOf1: 1530,
  familyOf2: 1795,
  familyOf3: 1898,
  familyOf4: 2101,
  familyOf5: 2144,
 },
 {
  state: "HI",
  familyOf1: 2531.4,
  familyOf2: 3523.4,
  familyOf3: 3132,
  familyOf4: 3124.2,
  familyOf5: 3396.4,
 },
 {
  state: "IL",
  familyOf1: 1700.6,
  familyOf2: 1556.6,
  familyOf3: 1798.8,
  familyOf4: 2060.2,
  familyOf5: 1505.4,
 },
 {
  state: "IN",
  familyOf1: 1390,
  familyOf2: 1634,
  familyOf3: 1722,
  familyOf4: 1920,
  familyOf5: 1952,
 },
 {
  state: "IA",
  familyOf1: 1366,
  familyOf2: 1604,
  familyOf3: 1690,
  familyOf4: 1883,
  familyOf5: 1914,
 },
 {
  state: "KS",
  familyOf1: 1375,
  familyOf2: 1614,
  familyOf3: 1701,
  familyOf4: 1898,
  familyOf5: 1930,
 },
 {
  state: "KY",
  familyOf1: 1315,
  familyOf2: 1544,
  familyOf3: 1626,
  familyOf4: 1810,
  familyOf5: 1839,
 },
 {
  state: "LA",
  familyOf1: 1469,
  familyOf2: 1725,
  familyOf3: 1818,
  familyOf4: 2027,
  familyOf5: 2060,
 },
 {
  state: "ME",
  familyOf1: 1546,
  familyOf2: 1813,
  familyOf3: 1911,
  familyOf4: 2132,
  familyOf5: 2167,
 },
 {
  state: "MD",
  familyOf1: 2101,
  familyOf2: 2467,
  familyOf3: 2597,
  familyOf4: 2893,
  familyOf5: 2937,
 },
 {
  state: "MA",
  familyOf1: 2445,
  familyOf2: 2870,
  familyOf3: 3023,
  familyOf4: 3374,
  familyOf5: 3428,
 },
 {
  state: "MI",
  familyOf1: 1505,
  familyOf2: 1767,
  familyOf3: 1860,
  familyOf4: 2072,
  familyOf5: 2106,
 },
 {
  state: "MN",
  familyOf1: 1535,
  familyOf2: 1805,
  familyOf3: 1900,
  familyOf4: 2117,
  familyOf5: 2151,
 },
 {
  state: "MS",
  familyOf1: 1278,
  familyOf2: 1501,
  familyOf3: 1580,
  familyOf4: 1763,
  familyOf5: 1793,
 },
 {
  state: "MO",
  familyOf1: 1361,
  familyOf2: 1597,
  familyOf3: 1681,
  familyOf4: 1876,
  familyOf5: 1905,
 },
 {
  state: "NE",
  familyOf1: 1468,
  familyOf2: 1725,
  familyOf3: 1816,
  familyOf4: 2024,
  familyOf5: 2057,
 },
 {
  state: "NV",
  familyOf1: 1601,
  familyOf2: 1881,
  familyOf3: 1977,
  familyOf4: 2203,
  familyOf5: 2241,
 },
 {
  state: "NH",
  familyOf1: 1976,
  familyOf2: 2320,
  familyOf3: 2446,
  familyOf4: 2722,
  familyOf5: 2767,
 },
 {
  state: "NJ",
  familyOf1: 2623,
  familyOf2: 3078,
  familyOf3: 3244,
  familyOf4: 3622,
  familyOf5: 3677,
 },
 {
  state: "NM",
  familyOf1: 1466,
  familyOf2: 1723,
  familyOf3: 1818,
  familyOf4: 2024,
  familyOf5: 2056,
 },
 {
  state: "NY",
  familyOf1: 1836,
  familyOf2: 2156,
  familyOf3: 2272,
  familyOf4: 2534,
  familyOf5: 2574,
 },
 {
  state: "NC",
  familyOf1: 1414,
  familyOf2: 1660,
  familyOf3: 1748,
  familyOf4: 1947,
  familyOf5: 1978,
 },
 {
  state: "ND",
  familyOf1: 1437,
  familyOf2: 1688,
  familyOf3: 1780,
  familyOf4: 1984,
  familyOf5: 2016,
 },
 {
  state: "OH",
  familyOf1: 1432,
  familyOf2: 1683,
  familyOf3: 1771,
  familyOf4: 1972,
  familyOf5: 2004,
 },
 {
  state: "OK",
  familyOf1: 1329,
  familyOf2: 1561,
  familyOf3: 1643,
  familyOf4: 1830,
  familyOf5: 1859,
 },
 {
  state: "OR",
  familyOf1: 1739.9,
  familyOf2: 2046.7,
  familyOf3: 2156.7,
  familyOf4: 2403.2,
  familyOf5: 2443.8,
 },
 {
  state: "PA",
  familyOf1: 1481.5,
  familyOf2: 1740.5,
  familyOf3: 1833.2,
  familyOf4: 2043.9,
  familyOf5: 2077.4,
 },
 {
  state: "RI",
  familyOf1: 2073.4,
  familyOf2: 2430.4,
  familyOf3: 2550.6,
  familyOf4: 2841.8,
  familyOf5: 2887.8,
 },
 {
  state: "SC",
  familyOf1: 1452.1,
  familyOf2: 1708.9,
  familyOf3: 1799.3,
  familyOf4: 2006.9,
  familyOf5: 2038.3,
 },
 {
  state: "SD",
  familyOf1: 1396.3,
  familyOf2: 1640.4,
  familyOf3: 1728.7,
  familyOf4: 1923.2,
  familyOf5: 1955.9,
 },
 {
  state: "TN",
  familyOf1: 1391.1,
  familyOf2: 1632.4,
  familyOf3: 1718.4,
  familyOf4: 1911.4,
  familyOf5: 1944.2,
 },
 {
  state: "TX",
  familyOf1: 2800,
  familyOf2: 4100,
  familyOf3: 5200,
  familyOf4: 6200,
  familyOf5: 7200,
 },
 {
  state: "UT",
  familyOf1: 1589.5,
  familyOf2: 1865.5,
  familyOf3: 1964.5,
  familyOf4: 2185.5,
  familyOf5: 2220.5,
 },
 {
  state: "VT",
  familyOf1: 1753.5,
  familyOf2: 2057.5,
  familyOf3: 2165.5,
  familyOf4: 2415.5,
  familyOf5: 2454.5,
 },
 {
  state: "VA",
  familyOf1: 1623.5,
  familyOf2: 1905.5,
  familyOf3: 2005.5,
  familyOf4: 2234.5,
  familyOf5: 2270.5,
 },
 {
  state: "WA",
  familyOf1: 1944.61,
  familyOf2: 2282.25,
  familyOf3: 2401.13,
  familyOf4: 2676.02,
  familyOf5: 2722.7,
 },
 {
  state: "WV",
  familyOf1: 1276.97,
  familyOf2: 1499.24,
  familyOf3: 1578.21,
  familyOf4: 1760.02,
  familyOf5: 1788.34,
 },
 {
  state: "WI",
  familyOf1: 1533.22,
  familyOf2: 1800.95,
  familyOf3: 1896.18,
  familyOf4: 2116.62,
  familyOf5: 2152.86,
 },
 {
  state: "WY",
  familyOf1: 1610.36,
  familyOf2: 1890.18,
  familyOf3: 1992.89,
  familyOf4: 2223.73,
  familyOf5: 2259.54,
 },
 {
  state: "PR",
  familyOf1: 1085.72,
  familyOf2: 1275.46,
  familyOf3: 1344.74,
  familyOf4: 1497.04,
  familyOf5: 1521.96,
 },
];

const healthCareExpenses = {
 under65: 79,
 over65: 154,
};

const ivingExpenses = {
 familyOf1: {
  food: 466,
  housekeepingSupplies: 47,
  apparelAndServices: 96,
  personalCare: 43,
  miscellaneous: 189,
  total: 841,
 },
 familyOf2: {
  food: 777,
  housekeepingSupplies: 80,
  apparelAndServices: 145,
  personalCare: 78,
  miscellaneous: 309,
  total: 1389,
 },
 familyOf3: {
  food: 936,
  housekeepingSupplies: 85,
  apparelAndServices: 207,
  personalCare: 91,
  miscellaneous: 381,
  total: 1700,
 },
 familyOf4: {
  food: 1123,
  housekeepingSupplies: 90,
  apparelAndServices: 252,
  personalCare: 97,
  miscellaneous: 431,
  total: 1993,
 },
 familyOf5: {
  food: 1213,
  housekeepingSupplies: 97,
  apparelAndServices: 272,
  personalCare: 105,
  miscellaneous: 465,
  total: 2349,
 },
};
