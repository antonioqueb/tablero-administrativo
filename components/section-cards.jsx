"use client";

import { useEffect, useState } from "react";
import {
  TrendingDownIcon,
  TrendingUpIcon,
  DollarSignIcon,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Añadir import del Skeleton

export function SectionCards({ dateRange }) {
  const [ventasData, setVentasData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para carga

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) return;

    const fetchVentas = async () => {
      setIsLoading(true); // Inicia carga
      try {
        const start = dateRange.from.toISOString().split("T")[0];
        const end = dateRange.to.toISOString().split("T")[0];
        const url = `http://192.168.1.78:9000/ventas/?start=${start}&end=${end}`;

        console.log("⏳ Consultando API de ventas en:", url);

        const res = await fetch(url);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Respuesta no exitosa. Cuerpo:", errorText);
          throw new Error(`Error al consultar la API (status ${res.status})`);
        }

        const data = await res.json();
        setVentasData(data);
      } catch (error) {
        console.error("🔥 Error al obtener datos de ventas:", error);
      } finally {
        setIsLoading(false); // Termina carga
      }
    };

    fetchVentas();
  }, [dateRange]);

  const KPIs = [
    {
      section: "Ventas",
      icon: DollarSignIcon,
      description: "Ingresos Totales",
      value: ventasData?.ventas_confirmadas?.ingresos_totales ?? "$0",
      trend: ventasData?.analisis_periodo?.comparativa ?? "0%",
      isPositive: ventasData?.analisis_periodo?.esPositivo ?? true,
      footerMain: ventasData?.analisis_periodo?.mensaje ?? "Sin datos de comparación",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6">
      {isLoading
        ? // Renderizar esqueletos durante carga
          Array.from({ length: KPIs.length }).map((_, index) => (
            <Card
              key={`skeleton-${index}`}
              className="shadow-xs bg-gradient-to-t from-primary/5 to-card dark:bg-card p-4 space-y-4 animate-pulse"
            >
              <Skeleton className="h-6 w-6 rounded-full bg-muted/40" />
              <Skeleton className="h-4 w-1/2 bg-muted/40" />
              <Skeleton className="h-8 w-3/4 bg-muted/40" />
              <Skeleton className="h-4 w-full bg-muted/40" />
            </Card>

          ))
        : // Renderizar contenido real
          KPIs.map((kpi) => (
            <Card
              key={kpi.section}
              className="@container/card shadow-xs bg-gradient-to-t from-primary/5 to-card dark:bg-card"
            >
              <CardHeader className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <kpi.icon className="size-6 text-primary" />
                </div>
                <CardDescription>{kpi.description}</CardDescription>
              </CardHeader>

              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums px-6">
                {kpi.value}
              </CardTitle>

              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {kpi.footerMain}
                  {kpi.isPositive ? (
                    <TrendingUpIcon className="size-4 text-green-600" />
                  ) : (
                    <TrendingDownIcon className="size-4 text-red-600" />
                  )}
                </div>
                <div className="text-muted-foreground">{kpi.footerDetail}</div>
              </CardFooter>
            </Card>
          ))}
    </div>
  );
}
