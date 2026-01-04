"use client"

import CustomBreadcrumb from "@/components/other-component/custom-breadcrumb"

export default function DashboardPage() {
    return (
        <div>
            <div className='w-full'>
                <CustomBreadcrumb />
            </div>
            <span>Dashboard</span>
        </div>
    )
}