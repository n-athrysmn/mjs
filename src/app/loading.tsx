"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
    </div>
  );
}
