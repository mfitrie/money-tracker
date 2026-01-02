"use client"

import { ModeToggle } from './mode-toggle'
import { SidebarTrigger } from '../ui/sidebar'

export default function Navbar() {
    return (
        <header className='bg-background flex flex-col'>
            <div className='flex items-center justify-between gap-8 px-4 py-7 sm:px-6'>
                <div className='text-muted-foreground flex gap-8 font-medium justify-center'>
                    <span className='hover:text-primary'>Money Tracker</span>
                </div>

                <div className='flex items-center gap-6'>
                    <ModeToggle />
                    <SidebarTrigger className='cursor-pointer' />
                </div>
            </div>
        </header>
    )
}