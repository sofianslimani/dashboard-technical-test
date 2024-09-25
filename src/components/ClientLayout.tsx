"use client";

import React, { useState, useCallback, useEffect } from "react";
import ClientSidebar from "@/components/ClientSidebar";
import MobileHeader from "@/components/MobileHeader";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className=" relative flex h-full sm:h-[calc(100vh-0.75rem)]">
      <ClientSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div className="flex-1 lex-grow h-full bg-gray-100 sm:rounded-tl-3xl overflow-hidden z-30 ">
        <MobileHeader onMenuClick={toggleSidebar} />
        <main className="  h-full p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
