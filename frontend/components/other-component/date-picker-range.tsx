"use client"

import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { type DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps {
    value?: DateRange
    onChange?: (range: DateRange | undefined) => void
    onReset?: () => void
    isDirty?: boolean
}

export function DatePickerWithRange({
    value,
    onChange,
    onReset,
    isDirty = false,
}: DatePickerWithRangeProps) {
    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation()
        onReset?.()
    }

    return (
        <Field className="mx-auto w-60">
            <div className="flex items-center gap-1.5">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="dateRange"
                            className="flex-1 justify-start px-2.5 font-normal"
                        >
                            <CalendarIcon className="shrink-0" />
                            {value?.from ? (
                                value.to ? (
                                    <>
                                        {format(value.from, "LLL dd, y")} -{" "}
                                        {format(value.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(value.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            defaultMonth={value?.from}
                            selected={value}
                            onSelect={onChange}
                            numberOfMonths={1}
                        />
                    </PopoverContent>
                </Popover>

                {isDirty && onReset && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-9 shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={handleReset}
                        aria-label="Reset date range"
                    >
                        <X className="size-4" />
                    </Button>
                )}
            </div>
        </Field>
    )
}