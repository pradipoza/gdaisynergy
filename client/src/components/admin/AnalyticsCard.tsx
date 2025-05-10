import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  value: number;
  trend: number;
  icon: string;
  description: string;
  color: "blue" | "green" | "purple" | "orange" | "red" | "yellow";
}

const AnalyticsCard = ({
  title,
  value,
  trend,
  icon,
  description,
  color,
}: AnalyticsCardProps) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: "text-blue-500",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: "text-green-500",
      border: "border-green-200",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: "text-purple-500",
      border: "border-purple-200",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      icon: "text-orange-500",
      border: "border-orange-200",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: "text-red-500",
      border: "border-red-200",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      icon: "text-yellow-500",
      border: "border-yellow-200",
    },
  };

  const colors = colorMap[color];

  // Animate the value counting up
  const formatValue = (val: number) => {
    return val > 999 ? `${(val / 1000).toFixed(1)}k` : val;
  };

  return (
    <Card className={`border ${colors.border}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center ${colors.icon}`}>
            <i className={`${icon}`}></i>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <div className="text-2xl font-bold">{formatValue(value)}</div>
          <div className="flex items-center mt-1">
            <div
              className={`flex items-center text-sm ${
                trend >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(trend)}%</span>
            </div>
            <CardDescription className="ml-2 text-xs">{description}</CardDescription>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
