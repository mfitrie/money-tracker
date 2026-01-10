"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { formatRMCurrency } from "@/utils/utils"

export const description = "A pie chart with a label"

// const chartData = [
//     { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//     { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//     { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//     { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//     { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//     visitors: {
//         label: "Visitors",
//     },
//     chrome: {
//         label: "Chrome",
//         color: "var(--chart-1)",
//     },
//     safari: {
//         label: "Safari",
//         color: "var(--chart-2)",
//     },
//     firefox: {
//         label: "Firefox",
//         color: "var(--chart-3)",
//     },
//     edge: {
//         label: "Edge",
//         color: "var(--chart-4)",
//     },
//     other: {
//         label: "Other",
//         color: "var(--chart-5)",
//     },
// } satisfies ChartConfig

export interface TodaysChartProps {
    listData: {
        category: string,
        spend: number,
        color: string,
    }[]
}



export function TodaysChart(payload: TodaysChartProps) {

    //* ------------------------------- Utils ------------------------------- *//
    function generateChartConfig(listData: TodaysChartProps['listData']): ChartConfig {
        const config: ChartConfig = {}
        listData.forEach((item) => {
            config[item.category] = {
                label: item.category,
                color: item.color,  // Use the actual color from data
            }
        });
        return config;
    }
    const config = generateChartConfig(payload.listData.map(item => ({
        category: item.category,
        spend: item.spend,
        color: item.color
    })));

    // Transform data to include fill property for the pie chart
    const chartData = payload.listData.map(item => ({
        ...item,
        fill: `var(--color-${item.category})`,
    }));
    //* ------------------------------- Utils ------------------------------- *//




    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Today's Expenditure</CardTitle>
                {/* <CardDescription>January - June 2024</CardDescription> */}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={config}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="spend" label nameKey="category" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-light">
                    You spend <span className="font-bold">{formatRMCurrency(5000, true)}</span> today!
                </div>
                {/* <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div> */}
            </CardFooter>
        </Card>
    )
}
