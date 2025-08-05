import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface StatsCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number;
  bgClass?: string;
  trend?: string | number;
  description?: string;
}

export const StatsCard = ({
  icon: Icon,
  label,
  value,
  bgClass = "bg-gradient-to-br from-gray-200 to-gray-400",
  trend,
  description,
}: StatsCardProps) => (
  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <CardContent className="p-8 relative">
      <div className="flex items-center gap-6">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${bgClass} shadow-xl group-hover:scale-110 transition-transform duration-500`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
            {label}
          </p>
          <div className="mb-2">
            <p className="text-3xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-max">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{trend}</span>
              </div>
            )}
          </div>

          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);
