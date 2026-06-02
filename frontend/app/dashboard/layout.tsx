import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardNavbar from "../../components/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* Sidebar */}

      <DashboardSidebar />



      {/* Main Content */}

      <div className="flex-1 flex flex-col">

        <DashboardNavbar />



        {/* Dynamic Page Content */}

        <main className="flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}