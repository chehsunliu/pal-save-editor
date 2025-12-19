import { Moon, Sun, Languages, Check } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";

import { Icons } from "@/components/icons.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button, buttonVariants } from "@/components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/theme-provider.tsx";
import { tracer } from "@/lib/tracer.ts";
import { langs } from "@/i18n";
import { cn } from "@/lib/utils";

const games = ["swd-2e", "pal", "pal-new"];

function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t, i18n } = useTranslation("common");
  const { theme, setTheme } = useTheme();

  const handleSelectionChange = (value: string) => {
    navigate(value);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const selectedGame = location.pathname.split("/")[1];

  useEffect(() => {
    const title = games.includes(selectedGame) ? t(`title.${selectedGame}`) : "Retro";
    document.title = title;

    // https://stackoverflow.com/a/63249329/876595
    tracer.gtag("event", "page_view", {
      page_title: title,
      page_path: location.pathname + location.search,
    });
  }, [t, selectedGame, location]);

  // This variable will be replaced statically: https://v2.vitejs.dev/guide/env-and-mode.html#production-replacement.
  const version = import.meta.env.VITE_RETRO_VERSION;
  const badge = (version?.length ?? 0) > 0 ? <Badge variant="secondary">{version}</Badge> : null;

  return (
    <div>
      <header className={"flex h-16 border-b px-48"}>
        <nav className={"flex flex-row grow gap-2 items-center"}>
          <Link to={"/"}>Retro {badge}</Link>
          <div className={"grow"} />
          <Select onValueChange={handleSelectionChange} value={games.includes(selectedGame) ? selectedGame : ""}>
            <SelectTrigger className={"w-[180px]"}>
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"swd-2e"}>{t("title.swd-2e")}</SelectItem>
              <SelectItem value={"pal"}>{t("title.pal")}</SelectItem>
              <SelectItem value={"pal-new"}>{t("title.pal-new")}</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Languages className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {
                langs.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.value} 
                    onClick={() => changeLanguage(lang.value)}
                    className={cn(
                      "relative pl-8",
                      i18n.language === lang.value && "bg-accent"
                    )}
                  >
                    {i18n.language === lang.value && (
                      <Check className="absolute left-2 h-4 w-4" />
                    )}
                    {lang.label}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Link
            className={buttonVariants({ variant: "outline", size: "icon" })}
            to={"https://github.com/chehsunliu/pal-save-editor"}
          >
            <Icons.github className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          </Link>
        </nav>
      </header>
      <main className={"px-48 py-6"}>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
