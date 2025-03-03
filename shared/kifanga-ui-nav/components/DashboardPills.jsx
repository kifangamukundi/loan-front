"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardPills = ({ tabs }) => {
  const pathname = usePathname();
  const tabsListRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const isActive = (path) => path === pathname;

  const manageIcons = () => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  const scrollTabs = (direction) => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - tabsListRef.current.offsetLeft);
    setScrollLeft(tabsListRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tabsListRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust multiplier for smoother dragging
    tabsListRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => isDragging && setIsDragging(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => isDragging && setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  useEffect(() => {
    const tabsList = tabsListRef.current;
    if (tabsList) {
      if (isDragging) {
        tabsList.addEventListener("mousemove", handleMouseMove);
      } else {
        tabsList.removeEventListener("mousemove", handleMouseMove);
      }

      return () => tabsList.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isDragging]);

  return (
    <div className="font-roboto bg-white rounded-lg overflow-hidden relative flex items-center px-2">
      {showLeftArrow && (
        <div
          className="h-10 w-10 flex items-center justify-center bg-green-600 text-white rounded-full cursor-pointer z-10 mr-2 absolute left-0"
          onClick={() => scrollTabs("left")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
      )}

      <ul
        ref={tabsListRef}
        className="flex gap-4 px-4 py-3 m-0 list-none overflow-x-auto scrollbar-hide scroll-smooth flex-1 justify-start space-x-4"
        onScroll={manageIcons}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {tabs.map((tab, index) => (
          <li key={index}>
            <Link
              href={tab.link}
              className={`inline-block px-6 py-2 text-gray-700 no-underline rounded-md select-none whitespace-nowrap ${
                isActive(tab.link) ? "bg-green-600 text-white font-bold" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>

      {showRightArrow && (
        <div
          className="h-10 w-10 flex items-center justify-center bg-green-600 text-white rounded-full cursor-pointer z-10 ml-2 absolute right-0"
          onClick={() => scrollTabs("right")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default DashboardPills;
