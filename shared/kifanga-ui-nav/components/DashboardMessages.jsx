import React from "react";

export default function DashboardMessages(props) {
  return (
    <>
        {React.Children.map(props.children, (child, index) => (
          <div className="mb-4 border-2 p-4 m-0 border-dashed border-orange-300 rounded-md bg-gray-100 text-orange-700 relative font-semibold text-lg text-center" role="alert">
              <span className="block sm:inline" key={index}>
                {child}
              </span>
          </div>
        ))}
    </>
  );
}