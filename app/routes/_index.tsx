import { Slider } from "~/components/ui/slider";
import type { MetaFunction } from "@remix-run/node";
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
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";

const chartConfig = {
  payout: {
    label: "payout",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartData {
  month: string;
  payout: number;
  fill?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Affiliate Tool" },
    { name: "description", content: "Recuring Passive income calculator" },
  ];
};

export default function Index() {
  const [chartData, setchartData] = useState<ChartData[]>([]);
  const [sliderValue, setSliderValue] = useState({
    newProject: 5,
    existingProject: 0,
    referredCustomer: 1,
  });

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        `/api/${sliderValue.referredCustomer}/${sliderValue.newProject}/${sliderValue.existingProject}`,
        { method: "POST" }
      );
      const data = await resp.json();
      const updatedData = data.monthlyPayoutArray.map(
        (item: ChartData, index: number) => ({
          ...item,
          fill:
            index === data.monthlyPayoutArray.length - 1
              ? "#afcc54"
              : "#81888f",
        })
      );
      setchartData(updatedData);
    }
    fetchData();
  }, [sliderValue]);

  return (
    <div className="grid grid-flow-row grid-row-4 gap-5 max-h-screen">
      <div className="row-span-1 text-3xl sm:text-balance text-center font-bold text-gray-800 w-2/6 m-auto">
        <h1>Calculate Your Recurring Passive Income</h1>
      </div>
      <div className="grid sm:grid-cols-3 sm:row-span-2 gap-5">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <div className="sm:w-2/3 mx-2 flex flex-col gap-5">
            <h1 className="text-pretty">
              Add in your expected referrals to see how much you could earn as{" "}
              <span className="font-bold">Sunvoy Affiliate</span> in just 1 year
            </h1>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 justify-between">
                <Label htmlFor="perPerson">Referred Customers per month</Label>
                <Input
                  type="number"
                  className="max-w-[5vw] text-center"
                  min={1}
                  max={10}
                  value={sliderValue.referredCustomer}
                  onChange={(e) =>
                    setSliderValue((prev) => ({
                      ...prev,
                      referredCustomer: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <Slider
                name="perPerson"
                max={10}
                value={[sliderValue.referredCustomer]}
                step={1}
                onValueChange={(value) =>
                  setSliderValue((prev) => ({
                    ...prev,
                    referredCustomer: value[0],
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 justify-between">
                <Label htmlFor="extProject">Avg. new projects per month</Label>
                <Input
                  type="number"
                  className="max-w-[5vw] text-center"
                  min={5}
                  max={50}
                  value={sliderValue.newProject}
                  onChange={(e) =>
                    setSliderValue((prev) => ({
                      ...prev,
                      newProject: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <Slider
                name="newProject"
                min={5}
                max={50}
                step={1}
                value={[sliderValue.newProject]}
                onValueChange={(value) =>
                  setSliderValue((prev) => ({
                    ...prev,
                    newProject: value[0],
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 justify-between">
                <Label htmlFor="extProject">Avg. existing projects</Label>
                <Input
                  type="number"
                  className="max-w-[5vw] text-center"
                  min={5}
                  value={sliderValue.existingProject}
                  max={50}
                  onChange={(e) =>
                    setSliderValue((prev) => ({
                      ...prev,
                      existingProject: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <Slider
                name="extProject"
                max={10000}
                value={[sliderValue.existingProject]}
                step={1}
                onValueChange={(value) =>
                  setSliderValue((prev) => ({
                    ...prev,
                    existingProject: value[0],
                  }))
                }
              />
            </div>

            <div>
              <h1 className="text-center">
                Your <span className="font-bold">monthly income</span> after 1
                year
              </h1>
              <h1 className="text-4xl font-bold text-center">
                $ {chartData[13]?.payout}
              </h1>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Card>
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
                  <Bar dataKey="payout" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                      formatter={(value: number) => `$${value.toFixed(0)}`}
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