"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Download, FileText, Table } from "lucide-react";
import {
  exportToCSV,
  exportToPDF,
  generateParcelReport,
  generateUserReport,
  generateFinancialReport,
} from "@/lib/export-utils";
import { getAllParcels } from "@/lib/parcel-data";
import { getAllUsers } from "@/lib/admin";

export function ReportGenerator() {
  const [reportType, setReportType] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async (format: "csv" | "pdf") => {
    if (!reportType) return;

    setIsGenerating(true);

    try {
      let reportData;

      switch (reportType) {
        case "parcels":
          const parcels = getAllParcels();
          const dateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
          reportData = generateParcelReport(parcels, dateRange);
          break;
        case "users":
          const users = getAllUsers();
          reportData = generateUserReport(users);
          break;
        case "financial":
          const allParcels = getAllParcels();
          const financialDateRange = dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
          reportData = generateFinancialReport(allParcels, financialDateRange);
          break;
        default:
          return;
      }

      if (format === "csv") {
        exportToCSV(reportData);
      } else {
        exportToPDF(reportData);
      }
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Report Generator
        </CardTitle>
        <CardDescription>Generate and export comprehensive reports for your logistics operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="report-type">Report Type</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="parcels">Parcel Report</SelectItem>
              <SelectItem value="users">User Report</SelectItem>
              <SelectItem value="financial">Financial Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Selection */}
        {(reportType === "parcels" || reportType === "financial") && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        {/* Export Buttons */}
        <div className="flex gap-3">
          <Button onClick={() => handleGenerateReport("csv")} disabled={!reportType || isGenerating} className="flex-1">
            <Table className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={() => handleGenerateReport("pdf")}
            disabled={!reportType || isGenerating}
            variant="outline"
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
