"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  addDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  format,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  groupType: z.enum(["hosts", "attendees"]),
  groupNumber: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Must be a number greater than 0",
    }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export default function PotluckCreateForm({
  onSubmit,
  householdCount,
  peopleCount,
  defaultValues = {
    groupType: "hosts",
    groupNumber: "1",
    dateRange: {
      from: startOfQuarter(new Date()),
      to: endOfQuarter(new Date()),
    },
  },
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues,
  });

  const setThisQuarterlyRange = () => {
    const now = new Date();
    form.setValue("dateRange", {
      from: startOfQuarter(now),
      to: endOfQuarter(now),
    });
  };

  const setNextQuarterlyRange = () => {
    const now = new Date();
    form.setValue("dateRange", {
      from: addMonths(startOfQuarter(now), 3),
      to: addMonths(endOfQuarter(now), 3),
    });
  };

  const setNextMonthlyRange = () => {
    const now = new Date();
    form.setValue("dateRange", {
      from: addMonths(startOfMonth(now), 1),
      to: addMonths(endOfMonth(now), 1),
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col space-y-2 px-1 md:px-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-lg">{`${householdCount} ${householdCount === 1 ? "family" : "families"} and ${peopleCount} ${peopleCount === 1 ? "single" : "singles"} are signed up`}</p>
          <FormField
            name="groupType"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Create potlucks by</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hosts" id="hosts" />
                      <Label htmlFor="groups">Number of Hosts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="attendees" id="attendees" />
                      <Label htmlFor="people">Number of Attendees</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="groupNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {form.watch("groupType") === "hosts"
                    ? "Number of Hosts"
                    : "Number of Attendees"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="max-w-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormControl>
            <FormField
              name="dateRange"
              control={form.control}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>Potluck Dates</FormLabel>
                  <div className="flex space-x-2 mb-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={setThisQuarterlyRange}
                    >
                      This Quarter
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={setNextQuarterlyRange}
                    >
                      Next Quarter
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={setNextMonthlyRange}
                    >
                      This Month
                    </Button>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !field && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick the dates</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={(value) => {
                          console.log(value);
                          field.onChange(value);
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            ></FormField>
          </FormControl>
          <FormMessage />
          <Button
            className="self-end"
            type="submit"
            disabled={!form.formState.isValid}
          >
            Set Hosts
          </Button>
        </form>
      </Form>
    </>
  );
}
