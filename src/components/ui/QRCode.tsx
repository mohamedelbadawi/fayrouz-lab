"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  url: string;
  label?: string;
}

export function QRCode({ url, label = "امسح الكود للوصول إلى هذه الصفحة" }: QRCodeProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center max-w-[280px] w-full mx-auto">
      <div className="mb-4 p-2 bg-white rounded-xl border border-gray-50 flex items-center justify-center relative">
        <QRCodeSVG 
          value={url}
          size={160}
          bgColor={"#ffffff"}
          fgColor={"#1c5f21"}
          level={"H"}
          includeMargin={false}
        />
      </div>
      <p className="font-tajawal font-medium text-sm text-gray-700 max-w-[200px] leading-relaxed">
        {label}
      </p>
    </div>
  );
}
