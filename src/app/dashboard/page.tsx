export default function HomePage() {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to StudentHub</h1>
      <p>Create landing pages for your products and manage orders easily.</p>
      <a href="/signup" className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        Get Started
      </a>
    </div>
  );
}