import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface OrdersChartProps {
  data: {
    processing: number;
    shipped: number;
    delivered: number;
  };
}

const chartConfig = {
  processing: {
    label: "processing",
    color: "hsl(var(--chart-1))",
  },
  shipped: {
    label: "shipped",
    color: "hsl(var(--chart-2))",
  },
  delivered: {
    label: "delivered",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function AdminDashboardOrdersChart({ data }: OrdersChartProps) {
  // Transform data into the format expected by Recharts
  const chartData = [
    {
      orderStatus: "processing",
      visitors: data.processing,
      fill: "hsl(var(--chart-1))",
    },
    {
      orderStatus: "shipped",
      visitors: data.shipped,
      fill: "hsl(var(--chart-2))",
    },
    {
      orderStatus: "delivered",
      visitors: data.delivered,
      fill: "hsl(var(--chart-3))",
    },
  ];

  return (
    <Card className="flex flex-col w-1/4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Orders Overview</CardTitle>
        <CardDescription>this month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="orderStatus">
              <LabelList
                dataKey="orderStatus"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
