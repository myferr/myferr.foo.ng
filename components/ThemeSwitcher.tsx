"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Palette } from "lucide-react";

const themes = [
  "default",
  "caffeine",
  "candyland",
  "catppuccin",
  "shadcn",
  "supabase",
  "twitter",
  "terminal",
] as const;

type ThemeName = (typeof themes)[number];

const THEME_STORAGE_KEY = "selected-theme";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>("default");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    if (saved && themes.includes(saved)) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (name: ThemeName) => {
    const existing = document.querySelector(`link[data-theme]`);
    if (existing) existing.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/styles/${name}.theme.css`;
    link.setAttribute("data-theme", name);
    document.head.appendChild(link);
  };

  const handleThemeChange = (name: ThemeName) => {
    setTheme(name);
    localStorage.setItem(THEME_STORAGE_KEY, name);
    applyTheme(name);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span className="capitalize">{theme}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {themes.map((t) => (
          <DropdownMenuItem key={t} onClick={() => handleThemeChange(t)}>
            <span className="capitalize">{t}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
