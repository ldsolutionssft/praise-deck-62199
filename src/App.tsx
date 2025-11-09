import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Members from "./pages/Members";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { userName, saveUserName, isLoaded } = useLocalStorage();

  if (!isLoaded) {
    return null;
  }

  if (!userName) {
    return <WelcomeScreen onComplete={saveUserName} />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/members" element={<Members />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
