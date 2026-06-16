// LoadingSpinner.jsx
export default function Spinner({
  size = "h-12 w-12",
  color = "border-blue-500",
  overlay = false,
}) {
  const spinner = (
    <div
      className={`${size} animate-spin rounded-full border-4 ${color} border-t-transparent`}
    />
  );

  // Overlay mode
  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        {spinner}
      </div>
    );
  }

  // Normal centered spinner
  return (
    <div className="flex items-center justify-center min-h-screen">
      {spinner}
    </div>
  );
}