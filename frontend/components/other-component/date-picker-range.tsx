"use client"

import { addDays, format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { type DateRange } from "react-day-picker"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import dayjs from "dayjs"
import { useEffect } from "react"

interface DatePickerWithRangeProps {
    onChangeEnd?: (date: DateRange | undefined) => void
}

const DEFAULT_RANGE: DateRange = {
    from: dayjs().startOf("week").toDate(),
    to: dayjs().endOf("week").toDate(),
}

const schema = z.object({
    dateRange: z.object({
        from: z.date({ message: "Start date is required" }),
        to: z.date({ message: "End date is required" }),
    }),
})

type FormValues = z.infer<typeof schema>

export function DatePickerWithRange({
    onChangeEnd,
}: DatePickerWithRangeProps
) {
    const datePickerForm = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            dateRange: DEFAULT_RANGE as { from: Date; to: Date },
        },
    });

    const watchDatePicker = datePickerForm.watch();
    useEffect(() => {
        if (
            watchDatePicker?.dateRange?.from &&
            watchDatePicker?.dateRange?.to &&
            datePickerForm.formState.isDirty
        ) {
            onChangeEnd?.(watchDatePicker.dateRange)
        }
    }, [watchDatePicker, datePickerForm.formState.isDirty])


    return (
        <Controller
            control={datePickerForm.control}
            name="dateRange"
            render={({ field, fieldState, formState }) => {
                const date: DateRange | undefined = field.value
                const isDirty = formState.isDirty;

                const handleReset = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    datePickerForm.reset()
                }

                return (
                    <Field className="mx-auto w-60">
                        <FieldLabel htmlFor="dateRange">Date Picker Range</FieldLabel>
                        <div className="flex items-center gap-1.5">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="dateRange"
                                        className="flex-1 justify-start px-2.5 font-normal"
                                    >
                                        <CalendarIcon className="shrink-0" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={field.onChange}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>

                            {isDirty && (
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
                        {/* //FIX: do later */}
                        {/* {fieldState.error?.from && (
                            <p className="text-sm text-destructive">
                                {fieldState?.error?.from.message}
                            </p>
                        )}
                        {fieldState.error?.to && (
                            <p className="text-sm text-destructive">
                                {fieldState?.error?.to.message}
                            </p>
                        )} */}
                    </Field>
                )
            }}
        />
    )
}