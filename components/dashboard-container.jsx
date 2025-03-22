"use client";

import { useState } from "react";
import { startOfMonth, endOfMonth } from "date-fns";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";

export function DashboardContainer() {
  const [dateRange, setDateRange] = useState({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  return (
    <>
      <SiteHeader dateRange={dateRange} setDateRange={setDateRange} />
      <SectionCards dateRange={dateRange} />
    </>
  );
}
