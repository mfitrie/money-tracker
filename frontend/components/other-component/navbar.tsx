"use client"

import { ModeToggle } from './mode-toggle'
import { SidebarTrigger } from '../ui/sidebar'

export default function Navbar() {
    return (
        <header className='bg-background flex flex-col'>
            <div className='flex items-center justify-between gap-8 px-4 py-7 sm:px-6'>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Money Tracker
                </h3>
                <div className='flex items-center gap-6'>
                    <ModeToggle />
                    <SidebarTrigger className='cursor-pointer' />
                </div>
            </div>
        </header>
    )
}