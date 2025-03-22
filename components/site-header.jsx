"use client";

import {
  endOfMonth,
  startOfMonth,
  startOfToday,
  endOfToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function SiteHeader({ dateRange, setDateRange }) {
  const handleQuickRangeChange = (value) => {
    const today = new Date();

    switch (value) {
      case "today":
        setDateRange({ from: startOfToday(), to: endOfToday() });
        break;
      case "this_week":
        setDateRange({
          from: startOfWeek(today, { weekStartsOn: 1 }),
          to: endOfWeek(today, { weekStartsOn: 1 }),
        });
        break;
      case "this_month":
        setDateRange({ from: startOfMonth(today), to: endOfMonth(today) });
        break;
      case "custom":
        setDateRange({ from: undefined, to: undefined });
        break;
      default:
        break;
    }
  };

  return (
    <header className="flex h-12 items-center border-b px-2 lg:px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1 lg:gap-2 truncate">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
        </div>
        <div className="flex items-center gap-1 lg:gap-2">
          <Select onValueChange={handleQuickRangeChange}>
            <SelectTrigger className="w-[120px] lg:w-[160px]">
              <SelectValue placeholder="Rango rápido" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="this_week">Esta semana</SelectItem>
              <SelectItem value="this_month">Este mes</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[180px] lg:w-[240px] justify-start text-left font-normal truncate"
              >
                {dateRange?.from ? (
                  dateRange.to ? (
                    `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                  ) : (
                    dateRange.from.toLocaleDateString()
                  )
                ) : (
                  <span className="truncate">Seleccionar fechas</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={window.innerWidth < 768 ? 1 : 2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
