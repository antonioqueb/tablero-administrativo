"use client"

import * as React from "react"
import Image from 'next/image'
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  TruckIcon,
  DollarSignIcon,
  BriefcaseIcon,
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  BoxesIcon,
  FactoryIcon,
  BanknoteIcon,
  HandshakeIcon,
  
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Daniel Ferrara",
    email: "daniel@hmx.com",
    avatar: "/avatar.png",
  },
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard",
      icon: LayoutDashboardIcon, // Alternativamente, HomeIcon
    },
    {
      title: "Ventas",
      url: "/sales",
      icon: ShoppingCartIcon,
    },
    {
      title: "Compras",
      url: "/purchases",
      icon: PackageIcon,
    },
    {
      title: "Inventario",
      url: "/inventory",
      icon: BoxesIcon,
    },
    {
      title: "Fabricación",
      url: "/manufacturing",
      icon: FactoryIcon,
    },
    {
      title: "Contabilidad",
      url: "/accounting",
      icon: BanknoteIcon,
    },
    {
      title: "CRM",
      url: "/crm",
      icon: HandshakeIcon,
    },
  ],
  
  navClouds: [
    {
      title: "Logística",
      icon: TruckIcon,
      url: "#",
      items: [
        {
          title: "Transferencias",
          url: "/inventory/transfers",
        },
        {
          title: "Rutas",
          url: "/inventory/routes",
        },
        {
          title: "Ubicaciones",
          url: "/inventory/locations",
        },
      ],
    },
    {
      title: "Producción",
      icon: SettingsIcon,
      url: "#",
      items: [
        {
          title: "Órdenes de fabricación",
          url: "/manufacturing/orders",
        },
        {
          title: "Órdenes de trabajo",
          url: "/manufacturing/work-orders",
        },
        {
          title: "Centros de trabajo",
          url: "/manufacturing/work-centers",
        },
      ],
    },
    {
      title: "Relaciones",
      icon: UsersIcon,
      url: "#",
      items: [
        {
          title: "Clientes",
          url: "/contacts/customers",
        },
        {
          title: "Proveedores",
          url: "/contacts/vendors",
        },
      ],
    },
    {
      title: "Finanzas",
      icon: DollarSignIcon,
      url: "#",
      items: [
        {
          title: "Facturas",
          url: "/accounting/invoices",
        },
        {
          title: "Pagos",
          url: "/accounting/payments",
        },
        {
          title: "Diarios",
          url: "/accounting/journals",
        },
      ],
    },
    {
      title: "Recursos Humanos",
      icon: BriefcaseIcon,
      url: "#",
      items: [
        {
          title: "Empleados",
          url: "/hr/employees",
        },
        {
          title: "Contratos",
          url: "/hr/contracts",
        },
        {
          title: "Asistencias",
          url: "/hr/attendances",
        },
      ],
    },
  ]
  ,
 
 
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
          <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
            <a href="#" className="flex items-center gap-2">
              <Image
                src="/logo.png" 
                alt="Logotipo de Hexágonos Mexicanos"
                width={130}
                height={150}
              />
              
            </a>
          </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
