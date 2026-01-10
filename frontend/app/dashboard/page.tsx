"use client"

import CustomBreadcrumb from "@/components/other-component/custom-breadcrumb"
import { TodaysChart, TodaysChartProps } from "@/components/other-component/dashboard/today-chart"

export default function DashboardPage() {
    const chartData: TodaysChartProps = {
        listData: [
            { category: "chrome", spend: 275, color: "#744700" },
            { category: "safari", spend: 200, color: "#542179" },
        ]
    }

    return (
        <div className="flex flex-col gap-4">
            <div className='w-full'>
                <CustomBreadcrumb />
            </div>
            <div>
                <TodaysChart 
                    listData={chartData.listData}
                />
            </div>
        </div>
    )
}