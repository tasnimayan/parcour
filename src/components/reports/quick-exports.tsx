"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, Users, Package } from "lucide-react";
import { exportToCSV, generateParcelReport, generateUserReport, generateFinancialReport } from "@/lib/export-utils";
import { getAllParcels } from "@/lib/parcel-data";
import { getAllUsers } from "@/lib/admin";

export function QuickExports() {
  const handleQuickExport = (type: "parcels" | "users" | "financial") => {
    let reportData;

    switch (type) {
      case "parcels":
        const parcels = getAllParcels();
        reportData = generateParcelReport(parcels);
        break;
      case "users":
        const users = getAllUsers();
        reportData = generateUserReport(users);
        break;
      case "financial":
        const allParcels = getAllParcels();
        reportData = generateFinancialReport(allParcels);
        break;
    }

    exportToCSV(reportData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Quick Exports
        </CardTitle>
        <CardDescription>Instantly export current data without filters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={() => handleQuickExport("parcels")} variant="outline" className="w-full justify-start">
          <Package className="w-4 h-4 mr-2" />
          Export All Parcels
        </Button>
        <Button onClick={() => handleQuickExport("users")} variant="outline" className="w-full justify-start">
          <Users className="w-4 h-4 mr-2" />
          Export All Users
        </Button>
        <Button onClick={() => handleQuickExport("financial")} variant="outline" className="w-full justify-start">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export Financial Summary
        </Button>
      </CardContent>
    </Card>
  );
}
