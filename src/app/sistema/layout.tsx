import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface SistemaLayoutProps {
    children: ReactNode;
}

export default function SistemaLayout({ children }: SistemaLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />  

            <SidebarTrigger />
       
                
            <main id="app-content" className="flex-1 overflow-y-auto mr-7 relative " >
                {children}
            </main>
        </SidebarProvider>
    )

}