import { ParcelData, UserData } from "./admin-api";

export interface ExportData {
  headers: string[];
  rows: (string | number)[][];
  filename: string;
}

export function exportToCSV(data: ExportData) {
  const csvContent = [data.headers.join(","), ...data.rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join(
    "\n"
  );

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${data.filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(data: ExportData) {
  // Mock PDF export - in production, use libraries like jsPDF or react-pdf
  const content = [
    `Report: ${data.filename}`,
    `Generated: ${new Date().toLocaleDateString()}`,
    "",
    data.headers.join(" | "),
    "-".repeat(data.headers.join(" | ").length),
    ...data.rows.map((row) => row.join(" | ")),
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${data.filename}.txt`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateParcelReport(parcels: ParcelData[], dateRange?: { from: Date; to: Date }) {
  let filteredParcels = parcels;

  if (dateRange) {
    filteredParcels = parcels.filter((parcel) => {
      const bookingDate = new Date(parcel.createdAt);
      return bookingDate >= dateRange.from && bookingDate <= dateRange.to;
    });
  }

  return {
    headers: [
      "Tracking ID",
      "Customer",
      "Status",
      "Pickup Address",
      "Delivery Address",
      "Amount",
      "Payment",
      "Agent",
      "Booking Date",
    ],
    rows: filteredParcels.map((parcel) => [
      parcel.trackingCode,
      parcel.customer.fullName,
      parcel.status,
      parcel.pickupAddress,
      parcel.deliveryAddress,
      `BDT ${parcel.codAmount}`,
      parcel.paymentType,
      parcel.assignment?.agent?.fullName || "Unassigned",
      new Date(parcel.createdAt).toLocaleDateString(),
    ]),
    filename: `parcel-report-${new Date().toISOString().split("T")[0]}`,
  };
}

export function generateUserReport(users: UserData[]) {
  return {
    headers: ["Name", "Email", "Role", "Phone", "Join Date", "Status"],
    rows: users.map((user) => [
      user.profile.fullName,
      user.email,
      user.role,
      user.profile.phone || "N/A",
      new Date(user.createdAt).toLocaleDateString(),
      "Active",
    ]),
    filename: `user-report-${new Date().toISOString().split("T")[0]}`,
  };
}

export function generateFinancialReport(parcels: ParcelData[], dateRange?: { from: Date; to: Date }) {
  let filteredParcels = parcels;

  if (dateRange) {
    filteredParcels = parcels.filter((parcel) => {
      const bookingDate = new Date(parcel.createdAt);
      return bookingDate >= dateRange.from && bookingDate <= dateRange.to;
    });
  }

  const totalRevenue = filteredParcels.reduce((sum, parcel) => sum + parcel.codAmount, 0);
  const codAmount = filteredParcels
    .filter((p) => p.paymentType === "COD")
    .reduce((sum, parcel) => sum + parcel.codAmount, 0);
  const prepaidAmount = filteredParcels
    .filter((p) => p.paymentType === "Prepaid")
    .reduce((sum, parcel) => sum + parcel.codAmount, 0);

  return {
    headers: ["Metric", "Value"],
    rows: [
      ["Total Parcels", filteredParcels.length],
      ["Total Revenue", `₹${totalRevenue}`],
      ["COD Collections", `₹${codAmount}`],
      ["Prepaid Revenue", `₹${prepaidAmount}`],
      ["Delivered Parcels", filteredParcels.filter((p) => p.status === "delivered").length],
      ["Pending Parcels", filteredParcels.filter((p) => p.status !== "delivered" && p.status !== "failed").length],
      ["Failed Deliveries", filteredParcels.filter((p) => p.status === "failed").length],
    ],
    filename: `financial-report-${new Date().toISOString().split("T")[0]}`,
  };
}
