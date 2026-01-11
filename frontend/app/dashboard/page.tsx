"use client"

import CustomBreadcrumb from "@/components/other-component/custom-breadcrumb"
import { TodaysChart } from "@/components/other-component/dashboard/today-chart"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className='w-full'>
                <CustomBreadcrumb />
            </div>
            <div>
                <TodaysChart />
            </div>
        </div>
    )
}