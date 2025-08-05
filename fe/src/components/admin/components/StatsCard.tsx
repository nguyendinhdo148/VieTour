import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

export const StatsCard = ({
  icon,
  iconBg,
  label,
  value,
  badge,
  trend,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: number | string;
  badge: string;
  trend?: string;
}) => {
  const isPositive = trend?.startsWith("+");
  const isNeutral = trend === "0%";

  return (
    <Card className="border-none shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 rounded-xl">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className={`${iconBg} p-5`}>
            <div className="flex items-center justify-between">
              <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md">
                {icon}
              </div>
              <Badge
                variant="secondary"
                className="bg-white/90 text-gray-700 font-medium shadow-sm"
              >
                {badge}
              </Badge>
            </div>
          </div>
          <div className="p-5 bg-white">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>

            {trend && (
              <div className="mt-4 flex items-center gap-2">
                {isNeutral ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100">
                    <Minus className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">
                      {trend}
                    </span>
                  </div>
                ) : isPositive ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">
                      {trend}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100">
                    <TrendingDown className="h-4 w-4 text-rose-600" />
                    <span className="text-sm font-medium text-rose-600">
                      {trend}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
