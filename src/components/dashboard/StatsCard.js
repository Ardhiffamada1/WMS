import { Card, CardContent } from "@/components/ui/card";

export function StatsCard({ title, value, icon: Icon, color = "sky", trend }) {
  const accentStyles = {
    sky: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <Card className="relative overflow-hidden border-slate-800/80 bg-slate-900/40 backdrop-blur-xl transition-all hover:border-slate-700/80">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
            {title}
          </span>
          {Icon && (
            <div className={`rounded-lg border p-2 ${accentStyles[color]}`}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <h3 className="text-2xl font-bold tracking-tight text-slate-50">
            {value}
          </h3>
          {trend && (
            <span
              className={`text-xs font-medium ${trend.startsWith("+") ? "text-emerald-400" : "text-slate-400"}`}
            >
              {trend}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
