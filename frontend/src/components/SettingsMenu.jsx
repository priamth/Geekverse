import { useState } from "react";
import { Settings, Sun, Moon, Terminal, Zap } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const THEME_OPTIONS = [
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    description: "Neon magenta + cyan over deep purple",
    icon: Zap,
  },
  {
    id: "terminal",
    label: "Retro Terminal",
    description: "Phosphor green CRT, VT323 font",
    icon: Terminal,
  },
  {
    id: "modern",
    label: "Modern Clean",
    description: "Light, minimal, with category colors",
    icon: Sun,
  },
];

export default function SettingsMenu() {
  const { theme, setTheme, reduceMotion, setReduceMotion, compact, setCompact } =
    useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Open settings"
          data-testid="settings-trigger"
          className="settings-trigger"
        >
          <Settings className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={12}
        className="w-80 p-0 border-border"
        data-testid="settings-panel"
      >
        <div className="px-4 py-3 border-b border-border">
          <div className="font-display font-bold text-base">Display Settings</div>
          <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
            // tweak your geekverse
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
            Theme
          </div>
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                data-testid={`theme-option-${opt.id}`}
                onClick={() => setTheme(opt.id)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-md border transition-colors ${
                  active
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/60"
                }`}
              >
                <Icon className="w-4 h-4 mt-0.5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{opt.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {opt.description}
                  </div>
                </div>
                {active && (
                  <span className="font-mono text-[10px] text-primary uppercase">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-4 py-3 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="reduce-motion" className="text-sm font-normal cursor-pointer">
              Reduce motion
            </Label>
            <Switch
              id="reduce-motion"
              data-testid="toggle-reduce-motion"
              checked={reduceMotion}
              onCheckedChange={setReduceMotion}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="compact" className="text-sm font-normal cursor-pointer">
              Compact cards
            </Label>
            <Switch
              id="compact"
              data-testid="toggle-compact"
              checked={compact}
              onCheckedChange={setCompact}
            />
          </div>
        </div>

        <div className="px-4 py-2 border-t border-border text-[10px] font-mono text-muted-foreground">
          tip: keep gear bottom-left to tweak vibe any time
        </div>
      </PopoverContent>
    </Popover>
  );
}
