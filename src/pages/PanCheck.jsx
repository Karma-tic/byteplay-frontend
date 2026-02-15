import { useState, useEffect } from "react";

import { motion } from "framer-motion";


function PanCheck() {
      useEffect(() => {
    document.title = "PAN Format Checker Online – Validate PAN Number | BytePlay";
  }, []);

  const [pan, setPan] = useState("");
  const [result, setResult] = useState(null);

  function checkPan(value) {
    const formatted = value.toUpperCase();
    setPan(formatted);

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (formatted.length === 10) {
      setResult(panRegex.test(formatted));
    } else {
      setResult(null);
    }
  }

  return (
    <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="max-w-lg mx-auto mt-12"
>

      <div className="bg-white shadow-md rounded-2xl p-8 border">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          PAN Format Checker
        </h2>

        <p className="text-gray-500 mb-6">
          Validate your PAN number format instantly.  
          <span className="block text-sm mt-1">
            Example: <span className="font-mono">ABCDE1234F</span>
          </span>
        </p>

        <input
          type="text"
          value={pan}
          onChange={(e) => checkPan(e.target.value)}
          placeholder="Enter PAN number"
          maxLength={10}
          className="w-full border rounded-lg px-4 py-3 text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <div className="mt-6 min-h-[40px]">

          {result === true && (
            <div className="flex items-center gap-2 text-green-600 font-medium animate-pulse">
              <span>✅</span> Valid PAN format
            </div>
          )}

          {result === false && (
            <div className="flex items-center gap-2 text-red-600 font-medium animate-pulse">
              <span>❌</span> Invalid PAN format
            </div>
          )}

        </div>
<div className="mt-8 text-sm text-gray-600 leading-relaxed">
  <h3 className="font-semibold text-gray-800 mb-2">
    What is a PAN Number?
  </h3>
  <p>
    A Permanent Account Number (PAN) is a 10-character alphanumeric identifier
    issued by the Income Tax Department of India. It is required for filing
    income tax returns, opening bank accounts, and most financial transactions.
  </p>

  <p className="mt-2">
    This tool helps you verify whether a PAN number follows the correct format
    before using it in official forms.
  </p>
</div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          🔒 We do not store or send your data anywhere.
        </p>

      </div>
    </motion.div>

  );
}

export default PanCheck;
