import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, LabelList } from "recharts";

const PieChartSection = ({ data, target, label, color, shift }) => (
    <div className="flex items-center mt-4 bg-gray-200 rounded-md">
        <span className="text-gray-700 text-md font-semibold mx-4">{label}</span>
        <ResponsiveContainer width="100%" height={120}>
            <PieChart className="ms-11">
                <Pie
                    data={[
                        { name: label, value: data[shift].value }, 
                        { name: "Remaining", value: 100 - data[shift].value }
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                >       
                    <Cell fill={color(data[shift].value)} />
                    <Cell fill="#487093" />
                    <LabelList
                        dataKey="value"
                        position="inside"
                        content={({ x, y, value, index }) => 
                            index === 0 ? (
                                <text x={x} y={y} fill="#000" textAnchor="start" dominantBaseline="central" fontSize="14px" className="translate-y-6 translate-x-29 font-semibold">
                                    {value.toFixed(2)}
                                </text>
                            ) : null
                        }
                    />
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    </div>
);

export default PieChartSection