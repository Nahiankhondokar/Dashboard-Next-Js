import SideBar from "@/components/common/SideBar";
import Navabar from "@/components/common/Navabar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function DashboardLayout({
children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const defaultOpen =
        cookieStore.get("sidebar_state")?.value === "true";

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <SideBar />
            <main className="w-full">
                <Navabar />
                <div className="px-4">{children}</div>
            </main>
        </SidebarProvider>
    );
}
