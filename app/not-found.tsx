import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-400 text-white text-center p-8">
      <div className="max-w-lg w-full">
        <img src="/placeholder-logo.svg" alt="RoadHelp Logo" className="mx-auto mb-8 w-24 h-24" />
        <h1 className="text-5xl font-bold mb-4">404 – Page Not Found</h1>
        <p className="mb-8 text-lg opacity-90">
          Oops! The page you’re looking for doesn’t exist or has been moved.<br />
          Let’s get you back on the road.
        </p>
        <Link href="/" className="inline-block px-6 py-3 rounded-full bg-white text-blue-900 font-semibold shadow hover:bg-blue-100 transition">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
