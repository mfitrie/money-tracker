"use client"

import { MenuIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ModeToggle } from './mode-toggle'

export default function Navbar() {
    return (
        <header className='bg-background sticky top-0 z-50'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6'>
                <div className='text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16'>
                    <span className='hover:text-primary max-md:hidden'>Money Tracker</span>
                </div>

                <div className='flex items-center gap-6'>
                    <ModeToggle />
                    <Button variant='outline' size='icon'>
                        <MenuIcon />
                        <span className='sr-only'>Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
