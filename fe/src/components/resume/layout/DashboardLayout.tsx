import Navbar from "@/components/shared/Navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <div className=""><Navbar /></div>
      <div className="container mx-auto pt-4 pb-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
