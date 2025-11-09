import { Music, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  userName: string;
  title?: string;
  subtitle?: string;
}

export function Header({ userName, title, subtitle }: HeaderProps) {
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BandLy</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:inline">{userName}</span>
          </div>
        </div>
        {(title || subtitle) && (
          <div>
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        )}
      </div>
    </header>
  );
}
