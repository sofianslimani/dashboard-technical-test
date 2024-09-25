import React from "react";
import { ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = React.memo(
  ({ onMenuClick }) => {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white z-40 p-2 flex items-center justify-between md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-zinc-800"
          aria-label="Open menu"
        >
          <ArrowRightFromLine className="h-6 w-6" />
        </Button>
      </header>
    );
  }
);

MobileHeader.displayName = "MobileHeader";

export default MobileHeader;
