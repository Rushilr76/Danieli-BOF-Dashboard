/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, LabelList } from "recharts";
import ProgressiveBars from "./ProgressiveBars";
// import dciLogo from "../assets/dci_logo.jpg";
import jsplLogo from "../assets/jspl.jpg";
import dci from "../assets/DCI.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import "react-day-picker/dist/style.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import DarkMode from "./DarkMode";
import "./scrollbar.css"

const data = {
    noHeatTapped: [{ name: "No Heat Tapped", A: 12, B: 16, C: 19 }],
    solidUsed: [
        { name: "A Shift", value: 15.44 },
        { name: "B Shift", value: 14.2 },
        { name: "C Shift", value: 15.0 }
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

const ShiftDashboard = () => {

    const getLabelColor = (value) => {
        if (value === 0) return "#0000FF";        
        if (value < 14.5) return "#d83828";       
        if (value <= 15.5) return "#ede346";      
        return "#50b50a";    
    };

    const getLabelColorOpeningC = (value) =>{
        if (value < 14.5) return "#d83828";
        if (value >= 14.5 && value <= 15.5) return "#ede346";
        if (value > 15.5) return "#50b50a";
        if(value === 0) return "#0000FF";
    };
    
    const getLabelColorNoHeatOxygenPPM = (value) => {
        if (value < 14.5) return "#d83828";
        if (value >= 14.5 && value <= 15.5) return "#ede346";
        if (value > 15.5) return "#50b50a";
        if(value === 0) return "#0000FF";
    };

    const getHighTemp = (value) =>{
        if (value < 14.5) return "#d83828";
        if (value >= 14.5 && value <= 15.5) return "#ede346";
        if (value > 15.5) return "#50b50a";
        if(value === 0) return "#0000FF";
    };

    const getLabelColorReblow = (value) => {
        if (value < 14.5) return "#d83828";
        if (value >= 14.5 && value <= 15.5) return "#ede346";
        if (value > 15.5) return "#50b50a";
        if(value === 0) return "#0000FF";
    };
    
    const getLabelColorSplashing = (value) => {
        if (value < 14.5) return "#d83828";
        if (value >= 14.5 && value <= 15.5) return "#ede346";
        if (value > 15.5) return "#50b50a";
        if(value === 0) return "#0000FF";
    };

    const getToBeYield = (value) =>{
        if (value < 14.5) return "#d83828";
        if (value >= 14.5 && value <= 15.5) return "#ede346";
        if (value > 15.5) return "#50b50a";
        if(value === 0) return "#0000FF";
    };

    const getFluxActual = (value) => {
        if (value < 14.5) return "#d83828";
        if (value >= 14.5 && value <= 15.5) return "#ede346";
        if (value > 15.5) return "#50b50a";
        if(value === 0) return "#0000FF";
    };

    const [selectedDate, setSelectedDate] = useState(getFormattedYesterday());

    function getFormattedDate(date) {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    function getFormattedYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return getFormattedDate(yesterday);
    }

     function goToPreviousDay() {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - 1);
        setSelectedDate(getFormattedDate(date));
    }

    // Helper to go to next day (not after yesterday)
    function goToNextDay() {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + 1);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (date <= yesterday) {
            setSelectedDate(getFormattedDate(date));
        }
    }

    // Compute if the selected date is yesterday
    const isAtYesterday = selectedDate === getFormattedYesterday();

    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prev) => !prev);
    const pickerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        } else {
        document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark')); 
    const [textColor, setTextColor] = useState(isDark ? '#eee' : '#000')

    const updateVar = () => {
        setIsDark(document.documentElement.classList.contains('dark'));
        setTextColor(isDark ? '#eee' : '#000');
    }

    return (
        <div className="p-6 bg-gray-100 max-h-screen overflow-clip dark:bg-black">
            <div className="flex items-center justify-between me-4 ms-1">
                <img className="w-30 h-auto mix-blend-darken dark:mix-blend-lighten scale-150" src={dci} alt="DCI Logo" style={{ clipPath: 'inset(5% 15% 5% 15%)' }}/>
                
                <h1 className="text-2xl font-bold font-gray-900 text-center mb-5 flex-grow dark:text-white">
                    Daily BOF Process Control Report Dashboard
                </h1>

                <img className="w-21 h-auto mix-blend-multiply scale-150 dark:mix-blend-lighten" src={jsplLogo} alt="JSPL Logo" />
            </div>


            <div className="relative flex items-center mb-4 h-12 mt-1">
                {/* Left Arrow - absolutely positioned left */}
                <button
                    onClick={goToPreviousDay}
                    className="absolute left-4 top-3 z-10 rounded-full p-3 bg-gray-50 shadow-md hover:bg-gray-200 hover:scale-120 transition-all duration-0 dark:bg-gray-700"
                    aria-label="Previous Day"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-100" />
                </button>

                {/* Date input - absolutely centered */}
                <div ref={pickerRef} className="relative inline-block text-left ms-[45vw] font-sans">
                    {/* Trigger Button */}
                    <button
                        onClick={toggle}
                        className="px-4 py-2 bg-white border border-gray-300 dark:border-gray-700 
                            rounded-xl shadow hover:scale-105 transition-all duration-0 
                            text-sm font-medium flex items-center gap-2 text-gray-700 dark:bg-black dark:text-white"
                    >
                        <CalendarDaysIcon className="w-5 h-5 text-green-600" />
                        {selectedDate ? format(selectedDate, "PP") : "Pick a date"}
                    </button>

                    {/* Animated Date Picker Dropdown */}
                    <AnimatePresence>
                        {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 0.9 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 
                                bg-white border border-gray-200 shadow-lg rounded-xl p-4 dark:bg-black"
                        >
                            <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                if(date) {
                                  setSelectedDate(getFormattedDate(date));
                                }
                                else {
                                    setSelectedDate(getFormattedDate(new date()))
                                }
                                setOpen(false);
                            }}                              
                            disabled={{ after:getFormattedYesterday() }}
                            className="text-sm text-gray-900 dark:bg-black dark:text-white"
                            modifiersClassNames={{
                                // selected: "dark:scale-130 dark:text-bold",
                                today: "text-green-600 font-semibold",
                            }}
                            />
                        </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="ms-7 bg-gray-100 rounded-xl transition-colors duration-0 dark:bg-black"
                onClick={updateVar}
                >
                    <DarkMode />
                </div>


                {/* Right Arrow - absolutely positioned right */}
                <button
                    onClick={goToNextDay}
                    disabled={isAtYesterday}
                    aria-label="Next Day"
                    className={`absolute right-4 top-4 z-10 rounded-full p-3 
                        ${isAtYesterday 
                        ? "bg-gray-50 text-gray-300 cursor-not-allowed dark:bg-gray-400" 
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-120 shadow-md dark:bg-gray-700"
                        } 
                        transition-all duration-0
                    `}
                >
                    <ChevronRight className="w-5 h-5 dark:text-gray-100" />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6 p-2 h-[88vh]">
                {["A", "B", "C"].map((shift, index) => (
                <div key={shift} className="bg-white p-4 rounded-lg shadow-xl flex flex-col max-h-screen overflow-y-scroll overflow-x-hidden dark:bg-black border border-gray-100 dark:border-gray-800 custom-scrollbar">

                    <h2 className="text-lg font-semibold mb-1 text-center underline dark:text-white">
                        Shift {shift}
                    </h2>

                    <div className="mb-10 mt-4 p-3 bg-blue-100 rounded-md dark:bg-slate-900 dark:text-gray-100">
                        <p><strong>S/I:</strong> {shift === "A" ? "Gajendra" : shift === "B" ? "Saurendra" : "Abhisek"}</p>
                        <p><strong>Blower:</strong> Rishav</p>
                        <p><strong>Tapping Incharge:</strong> {shift === "C" ? "Rishav" : shift === "B" ? "Murmu" : "Kishore"}</p>
                    </div>

                    {/* No Heat Tapped */}
                    <div className="bg-gray-200 rounded-md py-5 flex items-center space-x-2 dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">
                            No Heat Tapped
                        </span>

                        {/* Render bars progressively & dynamically based on the value */}
                        <ProgressiveBars total={data.noHeatTapped[0][shift]} />

                        {/* Total number of bars */}
                        
                    </div>

                    {/* Solid Used % */}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">Solid Used %</span>
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="ms-24.5">
                                <Pie
                                    data={[
                                    { name: "Solid Used%", value: data.solidUsed[index].value }, 
                                    { name: "Remaining", value: 100 - data.solidUsed[index].value }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill={getLabelColor(data.solidUsed[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* No Of Heat Opening C */}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        <div className="flex flex-col">
                            <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">No of Heat <br /> Opening C</span>
                            <span className="text-[11px] text-teal-600 dark:font-medium font-bold mx-4 mt-1 text-left">Value &lt; 14.5 then Red</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 text-left">Value &gt;= 14.5 and &lt; = 15.5 then Yellow</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 text-left">Value &gt; 15.5 then Green</span>
                        </div>

                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="-translate-x-3 dark:ms-2">
                                <Pie
                                    data={[
                                    { name: "No Of Heat Opening C", value: data.noOfHeatOpeningC[index].value }, 
                                    { name: "Remaining", value: 100 - data.noOfHeatOpeningC[index].value }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill={getLabelColorOpeningC(data.noOfHeatOpeningC[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    
                    {/* No Heat % oxygen ppm > 800 */}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        {/* <span className="text-gray-700 text-md font-semibold mx-4">No Heat % <br /> Oxygen ppm &gt; 800</span> */}
                        <div className="flex flex-col">
                            <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">No Heat % <br /> Oxygen ppm &gt; 800</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 mt-1 text-left">Value &lt; 14.5 then Red</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 text-left">Value &gt;= 14.5 and &lt; = 15.5 then Yellow</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 text-left">Value &gt; 15.5 then Green</span>
                        </div>
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="-translate-x-3 dark:ms-2">
                                <Pie
                                    data={[
                                        { name: "Actual Yield", value: data.noHeatOxygenppm[index].value }, 
                                        { name: "Remaining", value: 100 - data.noHeatOxygenppm[index].value }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill={getLabelColorNoHeatOxygenPPM(data.noHeatOxygenppm[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* High Temp > 1665 */}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        
                        <div className="flex flex-col">
                            <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">High Temperature &gt; 1665</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 mt-1 text-left">Value &lt; 14.5 then Red</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 text-left">Value &gt;= 14.5 and &lt; = 15.5 then Yellow</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 text-left">Value &gt; 15.5 then Green</span>
                        </div>
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="-translate-x-3 dark:ms-2">
                                <Pie
                                    data={[
                                    { name: "High Temperature > 1665", value: data.highTemp[index].value }, 
                                    { name: "Remaining", value: 100 - data.highTemp[index].value }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill= {getHighTemp(data.highTemp[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Reblow %age */}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">Reblow (%)</span>
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="ms-27">
                                <Pie
                                    data={[
                                    { name: "Reblow %age", value: data.reblow[index].value }, 
                                    { name: "Remaining", value: 100 - data.reblow[index].value }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill={getLabelColorReblow(data.reblow[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Splashing % */}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">Splashing (%)</span>
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="ms-23">
                                <Pie
                                    data={[
                                    { name: "Splashing %age", value: data.splashing[index].value }, 
                                    { name: "Remaining", value: 100 - data.splashing[index].value }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill={getLabelColorSplashing(data.splashing[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* To be Yield as per sms 1&2*/}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">To Be Yield <br /> As per SMS 1&2</span>
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="ms-19">
                                <Pie
                                    data={[
                                        { name: "To Be Yield", value: parseFloat(data.toBeYield[index].value.toFixed(2)) }, 
                                        { name: "Remaining", value: parseFloat((100 - data.toBeYield[index].value).toFixed(2)) }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill= {getToBeYield(data.toBeYield[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Actual Yield as per sms 1&2*/}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        <div className="flex flex-col">
                            <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">Actual Yield <br /> As per SMS 1&2</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 mt-1 text-left">Value &lt; 14.5 then Red</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 text-left">Value &gt;= 14.5 and &lt; = 15.5 then Yellow</span>
                            <span className="text-[11px] text-teal-600 dark:text-teal-600 dark:font-medium font-bold mx-4 text-left">Value &gt; 15.5 then Green</span>
                        </div>
                        
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="-translate-x-3 dark:ms-2">
                                <Pie
                                    data={[
                                        { name: "Actual Yield", value: parseFloat(data.actualYield[index].value.toFixed(2)) }, 
                                        { name: "Remaining", value: parseFloat((100 - data.actualYield[index].value).toFixed(2)) }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill={getLabelColor(data.actualYield[index].value, data.toBeYield[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Flux expected */}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">Flux Expected</span>
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="ms-23">
                                <Pie
                                    data={[
                                        { name: "Actual Yield", value: data.fluxToBe[index].value }, 
                                        { name: "Remaining", value: 100 - data.fluxToBe[index].value }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill= {getLabelColor(data.fluxToBe[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part (gray) 308fb8 */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Flux actual */}
                    <div className="flex items-center mt-4 bg-gray-200 rounded-md dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">Flux Actual</span>
                        <ResponsiveContainer width={150} height={120}>
                            <PieChart className="ms-28">
                                <Pie
                                    data={[
                                        { name: "Actual Flux", value: data.fluxActual[index].value }, 
                                        { name: "Remaining", value: parseFloat((100 - data.fluxActual[index].value).toFixed(2)) }
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                >
                                    <Cell fill={getFluxActual(data.fluxActual[index].value, data.fluxToBe[index].value)} /> {/* Filled part */}
                                    <Cell fill="#487093" /> {/* Empty part */}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        content={({ x, y, value, index }) =>
                                            index === 0 ? (
                                            <text x={x} y={y} fill={textColor} textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                                {value.toFixed(2)}
                                            </text>
                                            ) : null
                                        }
                                    />
                                </Pie>
                                {/* <Tooltip /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    
                    {/* Coating Condition At Shift End */}
                    <div className="flex items-center mt-6 bg-gray-200 rounded-md py-2 dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">
                            Coating Condition <br /> At Shift End
                        </span>

                        <div className="flex flex-col font-semibold ms-24">
                            {data.coatingCondition[index].value.map((text, i) => (
                            <span key={i} className="dark:text-gray-200">{text}</span>
                            ))}
                        </div>
                    </div>

                    {/* Remark / Major Issues */}
                    <div className="flex items-center mt-6 bg-gray-200 rounded-md py-2 dark:bg-zinc-900">
                        <span className="text-gray-700 text-md font-semibold mx-4 dark:text-gray-200">
                            Remark / <br /> Major Issues
                        </span>

                        <div className="flex flex-col font-bold italic ms-20 dark:text-gray-200">
                            {data.remark[index].value}
                        </div>
                    </div>

                </div>
                ))}
            </div>
        </div>
    );
};

export default ShiftDashboard;