import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SummaryCard = () => {
  const metrics = {
    deliveredParcels: 10,
    totalParcels: 20,
    failedParcels: 5,
    totalRevenue: 1000,
    codAmount: 500,
    totalUsers: 100,
    totalAgents: 50,
    totalCustomers: 50,
    totalAdmins: 10,
    avgDeliveryTime: 2,
  };
  const calculateSuccessRate = () =>
    metrics ? Math.round((metrics.deliveredParcels / metrics.totalParcels) * 100) : 0;

  const calculateFailureRate = () => (metrics ? Math.round((metrics.failedParcels / metrics.totalParcels) * 100) : 0);

  const calculateAvgOrderValue = () => (metrics ? Math.round(metrics.totalRevenue / metrics.totalParcels) : 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>User Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Customers</span>
              <span className="font-medium">{metrics.totalUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Delivery Agents</span>
              <span className="font-medium">{metrics.totalAgents}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Admins</span>
              <span className="font-medium">{metrics.totalUsers - metrics.totalCustomers - metrics.totalAgents}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Revenue</span>
              <span className="font-medium">${metrics.totalRevenue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">COD Amount</span>
              <span className="font-medium">${metrics.codAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg. Order Value</span>
              <span className="font-medium">${calculateAvgOrderValue()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Success Rate</span>
              <span className="font-medium">{calculateSuccessRate()}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg. Delivery Time</span>
              <span className="font-medium">{metrics.avgDeliveryTime}h</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Failure Rate</span>
              <span className="font-medium text-red-600">{calculateFailureRate()}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
