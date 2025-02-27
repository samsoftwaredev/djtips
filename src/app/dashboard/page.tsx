import { PrivateRoutes } from "@/components";

const Dashboard = () => {
  return (
    <PrivateRoutes>
      <h2 className="text-2xl">Dashboard</h2>;
    </PrivateRoutes>
  );
};

export default Dashboard;
