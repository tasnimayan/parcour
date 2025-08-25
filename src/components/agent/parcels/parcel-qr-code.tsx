import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface ParcelQRCodeProps {
  trackingNumber: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ParcelQRCode = ({ trackingNumber }: ParcelQRCodeProps) => {
  const qrUrl = `${API_URL}/admin/parcels/status/${trackingNumber}`;

  return (
    <div className="flex flex-col items-center space-y-2">
      <QRCodeSVG value={qrUrl} size={200} />
      <p className="text-sm text-gray-600">Scan to update status</p>
    </div>
  );
};

export default ParcelQRCode;
