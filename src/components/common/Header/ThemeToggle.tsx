import { useState, useEffect } from "react";
import { SunDim, Moon } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTheme("dark");
      sendGAEvent("event", "user_action", { event_category: "테마_변경_Dark" });
    } else {
      setTheme("light");
      sendGAEvent("event", "user_action", { event_category: "테마_변경_Light" });
    }
  };

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      const localTheme = localStorage.getItem("theme");
      document.querySelector("html")?.setAttribute("data-theme", localTheme || "light");
    }
  }, [theme]);

  return (
    <label className="cursor-pointer place-items-center">
      <div className="flex">
        <input
          type="checkbox"
          value="synthwave"
          className="theme-controller toggle relative col-span-2 col-start-1 row-start-1 border-surface1 bg-surface2 [--tglbg:theme(colors.surface1)]"
          onChange={handleToggle}
          checked={theme !== "light"}
        />
        <div className="absolute flex w-auto items-center gap-2.5 p-1">
          <SunDim size={16} strokeWidth={2} color="white" aria-label="라이트 모드" />
          <Moon size={14} strokeWidth={2.2} color="white" aria-label="다크 모드" />
        </div>
      </div>
    </label>
  );
};

export default ThemeToggle;
