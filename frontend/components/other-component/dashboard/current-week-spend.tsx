"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
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
import { getCurrentWeekSpend, GetCurrentWeekSpendDTO } from "@/lib/queries/dashboard"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import dayjs from "dayjs"
import { DatePickerWithRange } from "../date-picker-range"

const chartConfig = {
    total_amount: {
        label: "Amount",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function CurrentWeekSpend() {
    const { data: dataCurrentWeekSpend, isLoading, error: errorCurrentWeekSpend } = useQuery<GetCurrentWeekSpendDTO[]>({
        queryKey: ['getCurrentWeekSpend'],
        queryFn: () => getCurrentWeekSpend(),
        staleTime: 0,
        refetchOnMount: true,
    });

    // Normalize nulls to 0 so the line renders continuously
    const chartData = dataCurrentWeekSpend?.map(item => ({
        ...item,
        total_amount: item.total_amount ?? 0,
    })) ?? [];

    return (
        <div>
            {errorCurrentWeekSpend && (
                <span className='text-destructive'>{errorCurrentWeekSpend.message}</span>
            )}
            {isLoading && <Spinner />}
            {!isLoading && (
                <Card>
                    <CardHeader>
                        <CardTitle>Current Week Spend</CardTitle>
                        <CardDescription>Monday - Sunday, {dayjs().format("MMMM YYYY")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* //TODO: calendar week select to fetch */}
                        <DatePickerWithRange
                            onChangeEnd={e => {
                                console.log("From: ", e?.from, "To: ", e?.to);
                            }}
                        />
                        <ChartContainer config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={chartData}
                                margin={{ top: 24, left: 24, right: 24, bottom: 0 }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="day_name"             // ✅ was "month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            indicator="line"
                                        />
                                    }
                                />
                                <Line
                                    dataKey="total_amount"
                                    type="monotone"
                                    stroke="var(--color-total_amount)"
                                    strokeWidth={2}
                                    dot={{ fill: "var(--color-total_amount)" }}
                                    activeDot={{ r: 6 }}
                                >
                                    <LabelList
                                        dataKey="total_amount"     // ✅ was missing
                                        position="top"
                                        offset={12}
                                        className="fill-foreground"
                                        fontSize={12}
                                        formatter={(value: number) => formatRMCurrency(value, true)}
                                    />
                                </Line>
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}