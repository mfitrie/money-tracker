"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
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
import { GetCurrentWeekSpendDTO, getRangeDateSpend, GetRangeDateSpendDTO, GetRangeDateSpendSchema } from "@/lib/queries/dashboard"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import dayjs from "dayjs"
import { DatePickerWithRange } from "../date-picker-range"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { type DateRange } from "react-day-picker"

const chartConfig = {
    total_amount: {
        label: "Amount",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

function getDefaultDateRange(): GetRangeDateSpendDTO {
    return {
        date_from: dayjs().startOf("week").toISOString(),
        date_to: dayjs().endOf("week").toISOString(),
    }
}

export function CurrentWeekSpend() {
    //*-------------------------------------------------------useState-------------------------------------------------------*//
    const [mounted, setMounted] = useState(false);
    //*-------------------------------------------------------useState-------------------------------------------------------*//

    //*-------------------------------------------------------useForm-------------------------------------------------------*//
    const formDateRange = useForm<GetRangeDateSpendDTO>({
        resolver: zodResolver(GetRangeDateSpendSchema),
        defaultValues: getDefaultDateRange(),
    })

    const dateFrom = formDateRange.watch("date_from");
    const dateTo = formDateRange.watch("date_to");
    const isDirty = formDateRange.formState.isDirty;
    //*-------------------------------------------------------useForm-------------------------------------------------------*//

    //*-------------------------------------------------------useQuery-------------------------------------------------------*//
    const { data: dataRangeDateSpend, isLoading, error: errorCurrentWeekSpend } = useQuery<GetCurrentWeekSpendDTO[]>({
        queryKey: ['getRangeDateSpend', dateFrom, dateTo],
        queryFn: () => getRangeDateSpend({
            date_from: dateFrom,
            date_to: dateTo,
        }),
        staleTime: 0,
        refetchOnMount: true,
        enabled: mounted,
    });
    //*-------------------------------------------------------useQuery-------------------------------------------------------*//

    //*-------------------------------------------------------useEffect-------------------------------------------------------*//
    useEffect(() => {
        setMounted(true);
    }, []);
    //*-------------------------------------------------------useEffect-------------------------------------------------------*//

    //*-------------------------------------------------------useMemo-------------------------------------------------------*//
    const listData: (GetCurrentWeekSpendDTO & { day_label: string }) [] = useMemo(() => {
        return dataRangeDateSpend?.map(item => ({
            ...item,
            total_amount: item.total_amount ?? 0,
            day_label: `${item.day_name.slice(0, 3)} ${dayjs(item.day_date).format("DD/MM")}`,
        })) ?? [];
    }, [dataRangeDateSpend]);

    const total = useMemo(() => {
        return listData.reduce((acc, curr) => acc + (curr?.total_amount ?? 0), 0);
    }, [listData]);

    const pickerValue: DateRange | undefined = useMemo(() => {
        if (!dateFrom || !dateTo) return undefined;
        return {
            from: dayjs(dateFrom).toDate(),
            to: dayjs(dateTo).toDate(),
        };
    }, [dateFrom, dateTo]);
    //*-------------------------------------------------------useMemo-------------------------------------------------------*//

    //*-------------------------------------------------------utils function-------------------------------------------------------*//
    function handleDateRangeChange(range: DateRange | undefined) {
        if (range?.from) {
            formDateRange.setValue(
                "date_from",
                dayjs(range.from).startOf("day").toISOString(),
                { shouldDirty: true }
            );
        }
        if (range?.to) {
            formDateRange.setValue(
                "date_to",
                dayjs(range.to).endOf("day").toISOString(),
                { shouldDirty: true }
            );
        }
    }

    function resetDateRange() {
        formDateRange.reset(getDefaultDateRange());
    }
    //*-------------------------------------------------------utils function-------------------------------------------------------*//

    if (!mounted) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            {errorCurrentWeekSpend && (
                <span className='text-destructive'>{errorCurrentWeekSpend.message}</span>
            )}
            {isLoading && <Spinner />}
            {!isLoading && (
                <Card>
                    <CardHeader>
                        <CardTitle>Date Range Spend</CardTitle>
                        <div className="flex flex-row items-center">
                            <DatePickerWithRange
                                value={pickerValue}
                                onChange={handleDateRangeChange}
                                onReset={resetDateRange}
                                isDirty={isDirty}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-8">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-row items-center gap-2">
                                <span className="text-sm">Total: </span>
                                <span className="text-primary font-bold text-xl">
                                    {formatRMCurrency(total, true)}
                                </span>
                            </div>
                        </div>
                        <ChartContainer config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={listData}
                                margin={{ top: 24, left: 24, right: 24, bottom: 0 }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="day_label"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    // tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="line" />}
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
                                        dataKey="total_amount"
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