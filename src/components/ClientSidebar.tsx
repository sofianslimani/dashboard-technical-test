"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  UserGroupIcon,
  CalendarIcon,
  BellIcon,
  BookOpenIcon,
  MagnifyingGlassCircleIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Combobox } from "@/components/ui/combobox";

const spaceItems = [
  { href: "/", icon: Squares2X2Icon, label: "Mon Hub" },
  { href: "/mon-equipe", icon: UserGroupIcon, label: "Mon équipe" },
  { href: "/agenda", icon: CalendarIcon, label: "Agenda" },
  { href: "/notifications", icon: BellIcon, label: "Notifications" },
  { href: "/ressources", icon: BookOpenIcon, label: "Ressources" },
];

const productItems = [
  {
    href: "/recrutements",
    icon: MagnifyingGlassCircleIcon,
    label: "Recrutements",
  },
  {
    href: "/tous-produits",
    icon: Square3Stack3DIcon,
    label: "Tous nos produits",
  },
];

interface ClientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientSidebar({ isOpen, onClose }: ClientSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        onClose();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      onClose();
    } else {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
    }
  }, [isMobile, onClose, isCollapsed]);

  const renderNavItems = useCallback(
    (
      items: { href: string; icon: React.ElementType; label: string }[],
      title: string
    ) => (
      <div className="flex flex-col gap-3">
        <h3
          className={`text-xs uppercase font-semibold opacity-70 ${
            isCollapsed && !isMobile ? "sr-only" : ""
          }`}
        >
          {title}
        </h3>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant="ghost"
                className={`w-full ${
                  isCollapsed && !isMobile ? "justify-center" : "justify-start"
                } 
                transition-all duration-200
                ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-zinc-700 opacity-50 hover:opacity-100"
                }
                ${isCollapsed && !isMobile ? "px-2" : "px-4"}`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isCollapsed && !isMobile ? "mr-0" : "mr-3"
                  }`}
                />
                <span
                  className={`transition-opacity duration-200 ${
                    isCollapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"
                  }`}
                >
                  {item.label}
                </span>
                {isCollapsed && !isMobile && (
                  <span className="sr-only">{item.label}</span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    ),
    [isCollapsed, isMobile, pathname]
  );

  const sidebarClasses = useMemo(
    () => `
    bg-zinc-800 text-white transition-all duration-300 ease-in-out
    ${
      isMobile
        ? `fixed inset-y-0 left-0 z-50 w-64 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`
        : isCollapsed
        ? "w-20"
        : "w-64"
    } 
    flex flex-col gap-6 p-4
  `,
    [isMobile, isOpen, isCollapsed]
  );

  return (
    <aside className={sidebarClasses}>
      <div className="flex items-center justify-between">
        {(!isCollapsed || isMobile) && (
          <div className="overflow-hidden transition-all duration-300 w-32">
            <Image
              src="/images/logo-uptoo.png"
              alt="logo"
              width={128}
              height={32}
              className="h-6 w-auto"
            />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={isMobile ? onClose : toggleSidebar}
          className={`rounded-full bg-zinc-700 p-1 w-7 h-7 ${
            isCollapsed && !isMobile ? "ml-auto mr-auto" : ""
          }`}
          aria-label={
            isMobile
              ? "Close menu"
              : isCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {isMobile ? (
            <XMarkIcon className="h-6 w-6" />
          ) : isCollapsed ? (
            <ArrowRightFromLine className="h-4 w-4" />
          ) : (
            <ArrowLeftFromLine className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div
          className={`flex flex-col gap-6 ${
            isCollapsed && !isMobile ? "items-center" : ""
          }`}
        >
          <div className="flex flex-col gap-2">
            <div
              className={`flex items-center ${
                isCollapsed && !isMobile ? "justify-center" : "justify-between"
              } w-full`}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src="https://github.com/sofianslimani.png"
                  alt="RD"
                />
              </Avatar>
              {(!isCollapsed || isMobile) && (
                <>
                  <span className="font-semibold text-sm truncate max-w-[120px] ml-3">
                    Rémy Dubois
                  </span>
                  <EllipsisVerticalIcon className="h-6 w-6 opacity-50 flex-shrink-0 ml-auto" />
                </>
              )}
            </div>
            {(!isCollapsed || isMobile) && <Combobox />}
          </div>

          <nav className="space-y-4 w-full">
            {renderNavItems(spaceItems, "Mon espace")}
            {isCollapsed && !isMobile && (
              <hr className="border-gray-300 opacity-50" />
            )}
            {renderNavItems(productItems, "Mes produits")}
            {isCollapsed && !isMobile && (
              <hr className="border-gray-300 opacity-50" />
            )}

            <div className="flex flex-col gap-3">
              <h3
                className={`text-xs uppercase font-semibold opacity-75 ${
                  isCollapsed && !isMobile ? "sr-only" : ""
                }`}
              >
                Thème
              </h3>
              <ThemeToggle isCollapsed={isCollapsed && !isMobile} />
            </div>

            {!isCollapsed && (
              <Button variant="link-secondary" className="text-sm" size="link">
                Un problème ?
              </Button>
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
}
