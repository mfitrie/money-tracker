"use client"

import CustomBreadcrumb from "@/components/other-component/custom-breadcrumb"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserData, ResponseGetUserData } from "@/lib/queries/user"
import { formatRMCurrency } from "@/utils/utils"
import { useQuery } from "@tanstack/react-query"
import { User, User2 } from "lucide-react"
import { useSession } from "next-auth/react"

export default function AccountPage() {
    const { data: session } = useSession();
    const { data, isLoading, error } = useQuery<ResponseGetUserData>({
        queryKey: ['user', session?.user.username],
        queryFn: () => getUserData({
            username: session?.user.username as any
        }),
        enabled: Boolean(session?.user.username), // only runs when username is available
    });

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
                                <span className="text-muted-foreground">{data?.name}</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <span className="font-semibold">Email:</span>
                                <span className="text-muted-foreground">{data?.email}</span>
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