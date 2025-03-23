"use client";

import { useEffect, useState } from "react";
import {
  TrendingDownIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ReceiptIcon,
  PiggyBankIcon,
  ActivityIcon,
  ClipboardListIcon,
  PackageIcon
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SectionCards({ dateRange }) {
  const [ventasData, setVentasData] = useState(null);
  const [comprasData, setComprasData] = useState(null);
  const [manufacturaData, setManufacturaData] = useState(null); // NUEVO
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) return;

    const start = dateRange.from.toISOString().split("T")[0];
    const end = dateRange.to.toISOString().split("T")[0];

    const fetchVentas = async () => {
      try {
        const url = `http://192.168.1.78:9000/ventas/?start=${start}&end=${end}`;
        console.log("⏳ Consultando API de ventas en:", url);
        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setVentasData(data);
      } catch (error) {
        console.error("🔥 Error en ventas:", error);
      }
    };

    const fetchCompras = async () => {
      try {
        const url = `http://192.168.1.78:9000/compras/?start=${start}&end=${end}`;
        console.log("📦 Consultando API de compras en:", url);
        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setComprasData(data);
      } catch (error) {
        console.error("🔥 Error en compras:", error);
      }
    };

    const fetchManufactura = async () => {
      try {
        const url = `http://192.168.1.78:9000/manufactura/?start=${start}&end=${end}`;
        console.log("🏭 Consultando API de manufactura en:", url);
        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setManufacturaData(data);
      } catch (error) {
        console.error("🔥 Error en manufactura:", error);
      }
    };

    const fetchAll = async () => {
      setIsLoading(true);
      await Promise.all([fetchVentas(), fetchCompras(), fetchManufactura()]);
      setIsLoading(false);
    };

    fetchAll();
  }, [dateRange]);

  const KPIs = [
    // Ventas
    {
      section: "Ventas",
      icon: DollarSignIcon,
      description: "Ventas Totales",
      value: ventasData?.ventas_confirmadas?.ingresos_totales ?? "$0",
      trend: ventasData?.analisis_periodo?.ventas?.comparativa ?? "0%",
      isPositive: ventasData?.analisis_periodo?.ventas?.esPositivo ?? true,
      footerMain: ventasData?.analisis_periodo?.ventas?.mensaje ?? "Sin datos de comparación",
    },
    {
      section: "Facturación",
      icon: ReceiptIcon,
      description: "Total Facturado",
      value: ventasData?.facturacion?.total_facturado ?? "$0",
      trend: ventasData?.analisis_periodo?.facturacion?.comparativa ?? "0%",
      isPositive: ventasData?.analisis_periodo?.facturacion?.esPositivo ?? true,
      footerMain: ventasData?.analisis_periodo?.facturacion?.mensaje ?? "Sin datos de comparación",
    },
    {
      section: "Cobros",
      icon: PiggyBankIcon,
      description: "Total Cobrado",
      value: ventasData?.cobros_realizados?.total_cobrado ?? "$0",
      trend: ventasData?.analisis_periodo?.cobros?.comparativa ?? "0%",
      isPositive: ventasData?.analisis_periodo?.cobros?.esPositivo ?? true,
      footerMain: ventasData?.analisis_periodo?.cobros?.mensaje ?? "Sin datos de comparación",
    },

    // Compras
    {
      section: "Compras",
      icon: DollarSignIcon,
      description: "Total Comprado",
      value: comprasData?.compras_confirmadas?.total_comprado ?? "$0",
      trend: comprasData?.analisis_periodo?.compras?.comparativa ?? "0%",
      isPositive: comprasData?.analisis_periodo?.compras?.esPositivo ?? true,
      footerMain: comprasData?.analisis_periodo?.compras?.mensaje ?? "Sin datos de comparación",
    },
    {
      section: "Facturación Proveedor",
      icon: ReceiptIcon,
      description: "Total Facturado",
      value: comprasData?.facturacion_proveedor?.total_facturado ?? "$0",
      trend: comprasData?.analisis_periodo?.facturacion?.comparativa ?? "0%",
      isPositive: comprasData?.analisis_periodo?.facturacion?.esPositivo ?? true,
      footerMain: comprasData?.analisis_periodo?.facturacion?.mensaje ?? "Sin datos de comparación",
    },
    {
      section: "Pagos",
      icon: PiggyBankIcon,
      description: "Total Pagado",
      value: comprasData?.pagos_realizados?.total_pagado ?? "$0",
      trend: comprasData?.analisis_periodo?.pagos?.comparativa ?? "0%",
      isPositive: comprasData?.analisis_periodo?.pagos?.esPositivo ?? true,
      footerMain: comprasData?.analisis_periodo?.pagos?.mensaje ?? "Sin datos de comparación",
    },

    // Manufactura
    {
      section: "Eficiencia",
      icon: ActivityIcon,
      description: "Porcentaje Producción Completado",
      value: manufacturaData?.eficiencia?.porcentaje_completado ?? "0%",
      trend: manufacturaData?.eficiencia?.analisis_periodo?.comparativa ?? "0%",
      isPositive: manufacturaData?.eficiencia?.analisis_periodo?.esPositivo ?? true,
      footerMain: manufacturaData?.eficiencia?.analisis_periodo?.mensaje ?? "Sin datos de comparación",
    },
    {
      section: "Órdenes de Producción",
      icon: ClipboardListIcon,
      description: "Órdenes Producción Totales",
      value: manufacturaData?.ordenes_produccion?.total_ordenes?.toString() ?? "0",
      trend: manufacturaData?.ordenes_produccion?.analisis_periodo?.comparativa ?? "0%",
      isPositive: manufacturaData?.ordenes_produccion?.analisis_periodo?.esPositivo ?? true,
      footerMain: manufacturaData?.ordenes_produccion?.analisis_periodo?.mensaje ?? "Sin datos de comparación",
    },
    {
      section: "Volumen Producido",
      icon: PackageIcon,
      description: "Unidades Fabricadas",
      value: manufacturaData?.volumen_producido?.unidades_fabricadas?.toLocaleString() ?? "0",
      trend: manufacturaData?.volumen_producido?.analisis_periodo?.comparativa ?? "0%",
      isPositive: manufacturaData?.volumen_producido?.analisis_periodo?.esPositivo ?? true,
      footerMain: manufacturaData?.volumen_producido?.analisis_periodo?.mensaje ?? "Sin datos de comparación",
    },
  ];

  return (
    <div className="space-y-8 px-4 lg:px-6">
      {/* SECCIÓN VENTAS */}
      <div>
        <h2 className="text-xl font-bold text-muted-foreground mb-2">Ventas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(isLoading ? [0, 1, 2] : KPIs.slice(0, 3)).map((kpi, index) => (
            <Card
              key={kpi.section ?? index}
              className="@container/card shadow-xs bg-gradient-to-t from-primary/5 to-card dark:bg-card"
            >
              {isLoading ? (
                <div className="p-4 space-y-4 animate-pulse">
                  <Skeleton className="h-6 w-6 rounded-full bg-muted/40" />
                  <Skeleton className="h-4 w-1/2 bg-muted/40" />
                  <Skeleton className="h-8 w-3/4 bg-muted/40" />
                  <Skeleton className="h-4 w-full bg-muted/40" />
                </div>
              ) : (
                <>
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
                    <div className="line-clamp-1 flex gap-2 font-medium items-center">
                      {kpi.footerMain}
                      {kpi.isPositive ? (
                        <TrendingUpIcon className="size-4 text-green-600" />
                      ) : (
                        <TrendingDownIcon className="size-4 text-red-600" />
                      )}
                      <span className={kpi.isPositive ? "text-green-600" : "text-red-600"}>
                        {kpi.trend}
                      </span>
                    </div>
                    <div className="text-muted-foreground">{kpi.footerDetail}</div>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
  
      {/* SECCIÓN COMPRAS */}
      <div>
        <h2 className="text-xl font-bold text-muted-foreground mb-2">Compras</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(isLoading ? [3, 4, 5] : KPIs.slice(3, 6)).map((kpi, index) => (
            <Card
              key={kpi.section ?? index}
              className="@container/card shadow-xs bg-gradient-to-t from-primary/5 to-card dark:bg-card"
            >
              {isLoading ? (
                <div className="p-4 space-y-4 animate-pulse">
                  <Skeleton className="h-6 w-6 rounded-full bg-muted/40" />
                  <Skeleton className="h-4 w-1/2 bg-muted/40" />
                  <Skeleton className="h-8 w-3/4 bg-muted/40" />
                  <Skeleton className="h-4 w-full bg-muted/40" />
                </div>
              ) : (
                <>
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
                    <div className="line-clamp-1 flex gap-2 font-medium items-center">
                      {kpi.footerMain}
                      {kpi.isPositive ? (
                        <TrendingUpIcon className="size-4 text-green-600" />
                      ) : (
                        <TrendingDownIcon className="size-4 text-red-600" />
                      )}
                      <span className={kpi.isPositive ? "text-green-600" : "text-red-600"}>
                        {kpi.trend}
                      </span>
                    </div>
                    <div className="text-muted-foreground">{kpi.footerDetail}</div>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
  
      {/* SECCIÓN MANUFACTURA */}
      <div>
        <h2 className="text-xl font-bold text-muted-foreground mb-2">Producción</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(isLoading ? [6, 7, 8] : KPIs.slice(6, 9)).map((kpi, index) => (
            <Card
              key={kpi.section ?? index}
              className="@container/card shadow-xs bg-gradient-to-t from-primary/5 to-card dark:bg-card"
            >
              {isLoading ? (
                <div className="p-4 space-y-4 animate-pulse">
                  <Skeleton className="h-6 w-6 rounded-full bg-muted/40" />
                  <Skeleton className="h-4 w-1/2 bg-muted/40" />
                  <Skeleton className="h-8 w-3/4 bg-muted/40" />
                  <Skeleton className="h-4 w-full bg-muted/40" />
                </div>
              ) : (
                <>
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
                    <div className="line-clamp-1 flex gap-2 font-medium items-center">
                      {kpi.footerMain}
                      {kpi.isPositive ? (
                        <TrendingUpIcon className="size-4 text-green-600" />
                      ) : (
                        <TrendingDownIcon className="size-4 text-red-600" />
                      )}
                      <span className={kpi.isPositive ? "text-green-600" : "text-red-600"}>
                        {kpi.trend}
                      </span>
                    </div>
                    <div className="text-muted-foreground">{kpi.footerDetail}</div>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
  
}
