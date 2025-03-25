import { Card, CardContent } from "@/components/ui/card";
import {
  LucideIcon,
  MoveDown,
  MoveUp,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type Props = {
  title: string;
  value: string;
  percentage: string;
  icon: LucideIcon;
  style?: string;
};

const AdminDashboardCard = ({
  icon: Icon,
  percentage,
  title,
  value,
  style,
}: Props) => {
  return (
    <Card className="w-[250px] h-[120px] p-0">
      <CardContent className="flex  h-full justify-between p-2 px-4 ">
        <div className="flex-1 flex flex-col justify-between ">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <h4 className="text-sm text-gray-400">this month</h4>
          </div>

          <h3 className="font-bold text-2xl">{value}</h3>
        </div>
        <div className=" flex  flex-col justify-between items-end">
          <Icon className="bg-black text-white rounded-full px-2 size-10" />

          <div
            className={`flex-c text-sm font-semibold ${
              percentage.charAt(0) === "+" ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentage.length > 0 ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
            {percentage}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboardCard;
