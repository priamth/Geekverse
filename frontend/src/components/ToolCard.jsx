import * as Lucide from "lucide-react";
import { TrendingUp, Star } from "lucide-react";

export default function ToolCard({ tool, category, onClick }) {
  const Icon = Lucide[tool.icon] || Lucide.Wrench;
  const color = category?.color || "#a855f7";

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`tool-card-${tool.id}`}
      className="tool-card text-left animate-fade-up"
      style={{ "--cat-color": color }}
    >
      <span className="cat-strip" />
      <div className="body p-5 relative">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center"
            style={{
              background: `${color}26`,
              border: `1px solid ${color}55`,
              color,
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="cat-chip" style={{ "--cat-color": color }}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: color }}
            />
            {category?.name || tool.category_slug}
          </span>
        </div>

        <h3 className="font-display font-bold text-lg leading-tight mb-1">
          {tool.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {tool.description}
        </p>

        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3" style={{ color }} />
            {tool.popularity}
          </span>
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" style={{ color }} />
            {tool.click_count} clicks
          </span>
        </div>
      </div>
    </button>
  );
}
