"use client"

import CustomBreadcrumb from "@/components/other-component/custom-breadcrumb"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatRMCurrency } from "@/utils/utils"
import { User, User2 } from "lucide-react"

export default function AccountPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className='w-full'>
                <CustomBreadcrumb />
            </div>
            {/* <span>Account</span> */}

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-col justify-center items-center">
                            <User2 size={60} />
                        </CardTitle>
                        {/* <CardDescription>Card Description</CardDescription>
                        <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div className="flex flex-row items-center gap-2">
                                <span className="font-semibold">Name:</span>
                                <span className="text-muted-foreground">Muhammad Fitrie Bin Roslan</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <span className="font-semibold">Balance:</span>
                                <span className="text-muted-foreground">{formatRMCurrency(3000, true)}</span>
                            </div>
                        </div>
                    </CardContent>
                    {/* <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter> */}
                </Card>
            </div>
        </div>
    )
}