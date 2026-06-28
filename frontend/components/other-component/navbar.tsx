"use client"

import { ModeToggle } from './mode-toggle'
import { SidebarTrigger, useSidebar } from '../ui/sidebar'
import { Wallet } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Navbar() {
    const { data: session, status } = useSession();
    const { setOpen } = useSidebar();

    useEffect(() => {
        if (status === "unauthenticated") {
            setOpen(false);
        }
    }, [status, setOpen]);

    return (
        <header className='bg-background flex flex-col'>
            <div className='flex items-center justify-between gap-8 px-4 py-7 sm:px-6'>
                <div className='flex flex-row items-center gap-2'>
                    <Wallet />
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Money Tracker
                    </h3>
                </div>
                <div className='flex items-center gap-6'>
                    <ModeToggle />
                    {
                        (status !== "unauthenticated") && (
                            <SidebarTrigger className='cursor-pointer' />
                        )
                    }
                </div>
            </div>
        </header>
    )
}