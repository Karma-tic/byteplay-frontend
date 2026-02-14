function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">
            BytePlay
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-4">
          Smart Online Utility Tools for India
        </h2>

        <p className="text-gray-600 mb-8">
          Convert PDFs, resize images, validate formats, and create invoices —
          fast, free, and private.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            📄 PDF Tools
          </div>
          <div className="border rounded-lg p-6">
            🖼️ Image Tools
          </div>
          <div className="border rounded-lg p-6">
            🧾 Business Tools
          </div>
          <div className="border rounded-lg p-6">
            ✍️ Text Tools
          </div>
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} BytePlay.org · Made in India 🇮🇳
        </div>
      </footer>
    </div>
  );
}

export default App;
