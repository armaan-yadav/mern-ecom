import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getLastSixMonths } from "@/lib/utils";

type ChartData = {
  order: number[];
  revenue: number[];
};

type AdminDashboardChartProps = {
  data: ChartData;
};

const chartConfig = {
  order: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue (₹)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function AdminDashboardRevenueChart({
  data,
}: AdminDashboardChartProps) {
  const chartData = getLastSixMonths()
    .reverse()
    .map((month, index) => ({
      month,
      order: data.order[index],
      revenue: data.revenue[index],
    }));

  return (
    <Card className="w-3/4">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="order"
              yAxisId="left"
              fill="var(--color-order)"
              radius={4}
            />
            <Bar
              dataKey="revenue"
              yAxisId="right"
              fill="var(--color-revenue)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
