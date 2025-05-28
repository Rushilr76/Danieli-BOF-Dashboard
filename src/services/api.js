import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000', // Adjust this to match your Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch shift report data
export const fetchShiftReportData = async (date) => {
  try {
    // Format the date as needed by your backend
    const formattedDate = date ? date : '';

    // Make the API call - we have two endpoints available
    // Using the class-based view endpoint
    const response = await api.get(`/api/shift-report/?date=${formattedDate}`);

    // Process the data to match our frontend structure
    // The backend returns an array of shift reports
    return transformApiDataToFrontendFormat(response.data, date);
  } catch (error) {
    console.error('Error fetching shift report data:', error);
    throw error;
  }
};

// Function to transform API data to the format expected by our frontend
const transformApiDataToFrontendFormat = (apiData, date) => {
  // If no data, return empty structure
  if (!apiData || apiData.length === 0) {
    return {
      noHeatTapped: [{ name: "No Heat Tapped", A: 0, B: 0, C: 0 }],
      solidUsed: getDefaultShiftData(),
      noOfHeatOpeningC: getDefaultShiftData(),
      noHeatOxygenppm: getDefaultShiftData(),
      highTemp: getDefaultShiftData(),
      reblow: getDefaultShiftData(),
      splashing: getDefaultShiftData(),
      toBeYield: getDefaultShiftData(),
      actualYield: getDefaultShiftData(),
      fluxToBe: getDefaultShiftData(),
      fluxActual: getDefaultShiftData(),
      coatingCondition: [
        { name: "A Shift", value: [] },
        { name: "B Shift", value: [] },
        { name: "C Shift", value: [] }
      ],
      remark: [
        { name: "A Shift", value: "" },
        { name: "B Shift", value: "" },
        { name: "C Shift", value: "" }
      ],
    };
  }

  // Filter reports for the selected date
  const dateReports = apiData.filter(report => {
    // Convert report_date to YYYY-MM-DD format for comparison
    const reportDate = new Date(report.report_date).toISOString().split('T')[0];
    return reportDate === date;
  });

  // Group reports by shift
  const shiftA = dateReports.find(report => report.shift_name === 'A') || {};
  const shiftB = dateReports.find(report => report.shift_name === 'B') || {};
  const shiftC = dateReports.find(report => report.shift_name === 'C') || {};

  // Create the data structure expected by the frontend
  return {
    noHeatTapped: [{
      name: "No Heat Tapped",
      A: shiftA.no_heats_tapped || 0,
      B: shiftB.no_heats_tapped || 0,
      C: shiftC.no_heats_tapped || 0
    }],
    // For the remaining fields, we would need to map them from the API response
    // Since we don't have the exact field names in the API, this is a placeholder
    // You'll need to adjust these based on your actual API response structure

    // solidUsed: [
    //   { name: "A Shift", value: 15.44 },
    //   { name: "B Shift", value: 14.2 },
    //   { name: "C Shift", value: 15.0 }
    // ],
    solidUsed: [
      { name: "A Shift", value: parseFloat(shiftA.solid_used) || 0 },
      { name: "B Shift", value: parseFloat(shiftB.solid_used) || 0 },
      { name: "C Shift", value: parseFloat(shiftC.solid_used) || 0 }
    ],
    noOfHeatOpeningC: [
      { name: "A Shift", value: 16.00 },
      { name: "B Shift", value: 18.00 },
      { name: "C Shift", value: 8.00 }
    ],
    noHeatOxygenppm: [
      { name: "A Shift", value: 10.0 },
      { name: "B Shift", value: 6.5 },
      { name: "C Shift", value: 8.00 }
    ],
    highTemp: [
      { name: "A Shift", value: 0.0 },
      { name: "B Shift", value: 0.0 },
      { name: "C Shift", value: 0.0 }
    ],
    reblow: [
      { name: "A Shift", value: 31.0 },
      { name: "B Shift", value: 5.52 },
      { name: "C Shift", value: 8.00 }
    ],
    splashing: [
      { name: "A Shift", value: 82.0 },
      { name: "B Shift", value: 70.0 },
      { name: "C Shift", value: 25.0 }
    ],
    toBeYield: [
      { name: "A Shift", value: 88.94 },
      { name: "B Shift", value: 89.04 },
      { name: "C Shift", value: 89.24 }
    ],
    actualYield: [
      { name: "A Shift", value: 89.14 },
      { name: "B Shift", value: 89.24 },
      { name: "C Shift", value: 89.24 }
    ],
    fluxToBe: [
      { name: "A Shift", value: 90.0 },
      { name: "B Shift", value: 90.0 },
      { name: "C Shift", value: 90.0 }
    ],
    fluxActual: [
      { name: "A Shift", value: 80.77 },
      { name: "B Shift", value: 95.14 },
      { name: "C Shift", value: 73.14 }
    ],
    coatingCondition: [
      { name: "A Shift", value: [ "TP-THIN", "CP-THICK", "DE-THIN", "NDE_THIN", "BTM_THIN" ] },
      { name: "B Shift", value: [ "TP-THIN", "CP-THICK", "DE-THIN", "NDE_THIN", "BTM_THIN" ] },
      { name: "C Shift", value: [ "TP-THIN", "CP-THICK", "DE-THIN", "NDE_THIN", "BTM_THIN" ] }
    ],
    remark: [
      { name: "A Shift", value: "Splashing % Should Increase" },
      { name: "B Shift", value: "" },
      { name: "C Shift", value: "Need to Improve Splashing %" }
    ],
  };
};

// Helper function to create default shift data structure
const getDefaultShiftData = () => [
  { name: "A Shift", value: 0 },
  { name: "B Shift", value: 0 },
  { name: "C Shift", value: 0 }
];

export default api;
