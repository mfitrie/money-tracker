"use client"

import CustomBreadcrumb from "@/components/other-component/custom-breadcrumb"
import { AverageDailySpend } from "@/components/other-component/dashboard/average-daily-spend"
import { CurrentWeekSpend } from "@/components/other-component/dashboard/current-week-spend"
import { TodaysChart } from "@/components/other-component/dashboard/today-chart"

export default function DashboardPage() {

    return (
        <div className="flex flex-col gap-4">
            <div className='w-full'>
                <CustomBreadcrumb />
            </div>
            <div className="flex flex-col gap-4">
                <AverageDailySpend />
                <TodaysChart />
                <CurrentWeekSpend />
            </div>
        </div>
    )
}