import { Home, Calendar, Users, BarChart3 } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/events", icon: Calendar, label: "Eventos" },
  { to: "/members", icon: Users, label: "Membros" },
  { to: "/reports", icon: BarChart3, label: "Relatórios" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-primary bg-primary/10"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
