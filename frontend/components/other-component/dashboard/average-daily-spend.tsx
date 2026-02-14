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
import { getAverageDailySpend, GetAverageDailySpendDTO } from "@/lib/queries/dashboard"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"



export function AverageDailySpend() {
    const { data: averageDailySpendData, isLoading, error } = useQuery<GetAverageDailySpendDTO>({
        queryKey: ['getAverageDailySpend'],
        queryFn: () => getAverageDailySpend(),
    });




    return (
        <div>
            {
                error && (
                    <span className='text-destructive'>{error.message}</span>
                )
            }
            {
                isLoading && (
                    <Spinner />
                )
            }
            {
                !isLoading && (
                    <Card className="flex flex-col">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Average Daily Spend</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row items-center justify-center">
                            <h2 className="text-primary scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                {formatRMCurrency(averageDailySpendData?.data as any, true)}
                            </h2>
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
}
