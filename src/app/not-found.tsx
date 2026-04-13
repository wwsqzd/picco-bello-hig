"use client";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-gray-600 mb-8">
            Die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
        </div>
      </div>
    </div>
  );
}
