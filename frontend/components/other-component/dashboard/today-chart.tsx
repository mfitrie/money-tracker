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
import { getTodaysExpense, GetTodaysExpenseDTO } from "@/lib/queries/dashboard"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// export const description = "A pie chart with a label"



export function TodaysChart() {
    const [config, setConfig] = useState<ChartConfig | null>(null);

    const { data: todaysExpenseData, isLoading: isLoadingTodaysExpense, error: errorTodaysExpense } = useQuery<GetTodaysExpenseDTO>({
        queryKey: ['getTodaysExpense'],
        queryFn: () => getTodaysExpense(),
    });

    //* ------------------------------- useEffect ------------------------------- *//
    useEffect(() => {
        if (isLoadingTodaysExpense) {
            return;
        }
        if (!todaysExpenseData?.data) {
            return;
        }
        setConfig(generateChartConfig(todaysExpenseData as any));
    }, [isLoadingTodaysExpense, todaysExpenseData])
    //* ------------------------------- useEffect ------------------------------- *//


    //* ------------------------------- Utils ------------------------------- *//
    function generateChartConfig(data: GetTodaysExpenseDTO): ChartConfig {
        const config: ChartConfig = {}
        data.categories.forEach((item) => {
            config[item.name] = {
                label: item.name,
                color: item.color,
            }
        });
        return config;
    }

    // Transform data to include fill property for the pie chart
    const chartData = todaysExpenseData?.categories?.map(item => ({
        ...item,
        fill: item.color,
    }));
    //* ------------------------------- Utils ------------------------------- *//




    return (
        <div>
            {
                errorTodaysExpense && (
                    <span className='text-destructive'>{errorTodaysExpense.message}</span>
                )
            }
            {
                isLoadingTodaysExpense && (
                    <Spinner />
                )
            }
            {
                !isLoadingTodaysExpense && config && (
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
                                    <Pie data={chartData} dataKey="total" label nameKey="name" />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 leading-none font-light">
                                You spend <span className="font-bold">{formatRMCurrency(todaysExpenseData?.data ?? 0, true)}</span> today!
                            </div>
                        </CardFooter>
                    </Card>
                )
            }
            {
                (!isLoadingTodaysExpense) && (!chartData) && (
                    <div>
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>No today's spend</AlertDescription>
                        </Alert>
                    </div>
                )
            }
        </div>
    )
}
