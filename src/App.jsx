import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import ToolCard from "./components/ToolCard";
import PanCheck from "./pages/PanCheck";
import { FileText, Image, CreditCard, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import ImageCompress from "./pages/ImageCompress";
import PassportPhoto from "./pages/PassportPhoto";



function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800">

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12">
       

        <Routes>
          <Route
            path="/"
            element={
              <>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-center mb-16"
>
 <h2
  className="font-brand text-4xl sm:text-6xl font-extrabold mb-8
           tracking-tight leading-tight
           text-slate-900
           drop-shadow-[0_2px_0_rgba(255,255,255,0.6)]
           drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]"

>
  Smart Online Utility Tools for India
</h2>



  <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
    Convert PDFs, resize images, validate government formats, and create invoices —
    fast, free, and privacy-friendly.
  </p>

  <Link
    to="/pan-check"
    className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
  >
    Try PAN Checker →
  </Link>
</motion.div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link to="/pan-check">
  <ToolCard
    icon={ShieldCheck}
    title="PAN Format Checker"
    color="bg-gradient-to-br from-emerald-500 to-green-600"
  />
</Link>

<ToolCard
  icon={FileText}
  title="PDF Tools (Coming Soon)"
  color="bg-gradient-to-br from-indigo-500 to-purple-600"
/>

<Link to="/image-compress">
  <ToolCard
    icon={Image}
    title="Image Compressor"
    color="bg-gradient-to-br from-pink-500 to-rose-500"
  />
</Link>
<Link to="/passport-photo">
  <ToolCard
    icon={Image}
    title="Passport Size Photo Maker"
    color="bg-gradient-to-br from-sky-500 to-indigo-600"
  />
</Link>



<ToolCard
  icon={CreditCard}
  title="Invoice Tools (Coming Soon)"
  color="bg-gradient-to-br from-amber-500 to-orange-500"
/>

                </div>
              </>
            }
          />

          <Route path="/pan-check" element={<PanCheck />} />
          <Route path="/image-compress" element={<ImageCompress />} />
          <Route path="/passport-photo" element={<PassportPhoto />} />


        </Routes>
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
