import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DiscoverScreen from "./components/Discover/DiscoverScreen";
import CategoryScreen from "./components/Discover/CategoryScreen";
import MainLayout from "./components/Layout/MainLayout";

// Screens for BottomNav tabs
import ToursScreen from "./components/Tours/ToursScreen";
import JournalScreen from "./components/Journal/JournalScreen";
import EventsScreen from "./components/Events/EventsScreen";
import ProfileScreen from "./components/Profile/ProfileScreen";

import DirectionsPage from "./pages/DirectionsPage";

import ScrollToTop from "@/components/ScrollToTop"; // ✅ impo

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
       <ScrollToTop />
        <Routes>

          {/* Pages with BottomNavigation */}
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DISCOVER} element={<DiscoverScreen />} />
            <Route path={ROUTES.TEMPLES} element={<CategoryScreen category="Temples" categoryIcon="🏛️" />} />
            <Route path={ROUTES.FORTS} element={<CategoryScreen category="Forts" categoryIcon="🏰" />} />
            <Route path={ROUTES.MARKETS} element={<CategoryScreen category="Markets" categoryIcon="🛍️" />} />
            <Route path={ROUTES.GARDENS} element={<CategoryScreen category="Gardens" categoryIcon="🌺" />} />
            <Route path={ROUTES.MUSEUMS} element={<CategoryScreen category="Museums" categoryIcon="🏛️" />} />
            <Route path={ROUTES.VILLAGES} element={<CategoryScreen category="Villages" categoryIcon="🏘️" />} />

            {/* Bottom Nav Tabs */}
            <Route path={ROUTES.TOURS} element={<ToursScreen />} />
            <Route path={ROUTES.JOURNAL} element={<JournalScreen />} />
            <Route path={ROUTES.EVENTS} element={<EventsScreen />} />
            <Route path={ROUTES.PROFILE} element={<ProfileScreen />} />
          </Route>
          
          {/* Outside layout (e.g. splash, error) */}
          <Route path={ROUTES.HOME} element={<Index />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          <Route path="/directions" element={<DirectionsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
