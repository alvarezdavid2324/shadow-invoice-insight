import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Upload, Download, Inbox, User, Settings as SettingsIcon } from "lucide-react";
import logo from "@/assets/shadowrez-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Invoices", url: "/dashboard/invoices", icon: FileText },
  { title: "Upload", url: "/dashboard/upload", icon: Upload },
  { title: "Export", url: "/dashboard/export", icon: Download },
  { title: "Inbox", url: "/dashboard/inbox", icon: Inbox, pro: true },
];

const systemItems = [
  { title: "Account", url: "/dashboard/account", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: SettingsIcon },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (url: string) =>
    url === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="border-b border-border/60">
        <NavLink to="/" className="flex items-center gap-2 px-2 py-1.5">
          <img src={logo} alt="Shadowrez AI" className="h-7 w-auto object-contain shrink-0" />
          {!collapsed && (
            <span className="font-semibold tracking-tight text-sm">
              SHADOWREZ<span className="text-cyan"> AI</span>
            </span>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink to={item.url} end={item.url === "/dashboard"}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <span className="flex-1 flex items-center justify-between">
                          {item.title}
                          {item.pro && (
                            <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-cyan/40 text-cyan">
                              PRO
                            </Badge>
                          )}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="border-t border-border/60 p-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between mb-1">
            <span className="uppercase tracking-wider">Plan</span>
            <Badge variant="outline" className="border-cyan/40 text-cyan h-5">Starter</Badge>
          </div>
          <div className="font-mono">Demo workspace</div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

export default AppSidebar;
