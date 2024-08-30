import { Slider } from "~/components/ui/slider";

import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Label } from "~/components/ui/label";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const TotalIncome = 3075;

const chartData = [
  { month: "April", desktop: 73 },
  { month: "July", desktop: 180 },
  { month: "January", desktop: 186 },
  { month: "September", desktop: 195 },
  { month: "December", desktop: 210 },
  { month: "June", desktop: 214 },
  { month: "May", desktop: 209 },
  { month: "August", desktop: 220 },
  { month: "March", desktop: 237 },
  { month: "November", desktop: 230 },
  { month: "October", desktop: 250 },
  { month: "February", desktop: 305 },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Affiliate Tool" },
    { name: "description", content: "Recuring Passive income calculator" },
  ];
};

export default function Index() {
  return (
    <div className="grid grid-flow-row grid-row-4 gap-5 max-h-screen">
      <div className="row-span-1 text-3xl sm:text-balance text-center font-bold text-gray-800 w-2/6 m-auto">
        <h1>Calculate Your Recurring Passive Income</h1>
      </div>
      <div className="grid sm:grid-cols-3 sm:row-span-2 gap-5">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <div className="w-2/3 flex flex-col gap-5">
            <h1 className="text-pretty">
              Add in your expected referrals to see how much you could earn as{" "}
              <span className="font-bold">Sunvoy Affiliate</span> in just 1 year
            </h1>
            <div className="flex flex-col gap-1">
              <label htmlFor="perPerson">Referred Customers per month</label>
              <Slider
                name="perPerson"
                defaultValue={[10]}
                min={5}
                max={50}
                step={1}
              />
            </div>
            <div className="flex flex-col gap-1">
            <label htmlFor="extProject">Avg. new projects per month</label>
              <Slider name="NewProject" defaultValue={[1]} max={10} step={1} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="extProject">Avg. existimg projects</label>
              <Slider
                name="extProject"
                defaultValue={[100]}
                max={10000}
                step={1}
              />
            </div>
            <div>
              <h1 className="text-center">
                Your <span className="font-bold">monthly income</span> after 1
                year
              </h1>
              <h1 className="text-4xl font-bold text-center">
                $ {TotalIncome}
              </h1>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Card>
            {/* <CardHeader>
              <CardTitle>Bar Chart - Label</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader> */}
            <CardContent>
              <ChartContainer config={chartConfig} className="w-full">
                <BarChart
                  width={600}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="desktop" fill="#afcc54" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="row-span-1 sm:text-pretty text-center text-gray-500 sm:w-1/2 m-auto">
        <h1>
          Calulator are based on the number of Customers you refer each month
          annd avg. project volume. Factor in our churns and this bring you to
          estimated total passive future income.
        </h1>
      </div>
    </div>
  );
}
