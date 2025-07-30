import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./components/providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserDataProvider from "./components/providers/UserDataProvider.jsx";
import GameModeProvider from "./components/providers/GameModeProvider.jsx";
import DarkModeProvider from "./components/providers/DarkModeProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <UserDataProvider>
          <GameModeProvider>
            <DarkModeProvider>
              <App />
            </DarkModeProvider>
          </GameModeProvider>
        </UserDataProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
