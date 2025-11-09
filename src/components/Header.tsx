import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeaderProps {
  userName: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  onEditName?: () => void;
}

export function Header({ userName, title, subtitle, action, onEditName }: HeaderProps) {
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/60 border-b border-border/30">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="BandLy Logo" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline">{userName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background z-50">
                <DropdownMenuItem onClick={onEditName}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar nome
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {(title || subtitle) && (
          <div className="flex items-center justify-between gap-4">
            <div>
              {title && <h1 className="text-2xl font-bold">{title}</h1>}
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
      </div>
    </header>
  );
}
