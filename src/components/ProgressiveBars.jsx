import React from "react";
import { useEffect, useState } from "react";

const ProgressiveBars = ({ total }) => {
    const [visibleBars, setVisibleBars] = useState(0);

    useEffect(() => {
        setVisibleBars(0); 

        const interval = setInterval(() => {
            setVisibleBars(prev => {
                if (prev < total) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 120); 

        return () => clearInterval(interval); // cleanup on unmount
    }, [total]);

    return (
        <React.Fragment>
            <div className="flex space-x-0.75">
                {[...Array(visibleBars)].map((_, i) => (
                    <div
                    key={i}
                    className="bg-[#50b50a] w-3 h-6 rounded-md transition-transform duration-100 scale-100"
                    />
                ))}
            </div>

            <span className="text-gray-700 text-md font-semibold dark:text-white">
                [{visibleBars}]
            </span> 
        </React.Fragment>
    );
};

export default ProgressiveBars;