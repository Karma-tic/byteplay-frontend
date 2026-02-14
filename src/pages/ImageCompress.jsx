import { useState } from "react";
import { motion } from "framer-motion";

function ImageCompress() {
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setOriginalSize((file.size / 1024).toFixed(1));

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = 0.7; // compression factor
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const compressedFileSize = (blob.size / 1024).toFixed(1);
          setCompressedSize(compressedFileSize);
          setCompressedUrl(URL.createObjectURL(blob));
        },
        "image/jpeg",
        0.7
      );
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto mt-12"
    >
      <div className="bg-white shadow-md rounded-2xl p-8 border">

        <h2 className="text-2xl font-brand font-bold text-slate-900 mb-2">
          Image Compressor
        </h2>

        <p className="text-gray-500 mb-6">
          Compress images for government forms, college uploads, and websites.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mb-6"
        />

        {originalSize && (
          <div className="text-sm text-gray-600 mb-4">
            Original size: <b>{originalSize} KB</b>
          </div>
        )}

        {compressedSize && (
          <div className="text-sm text-green-600 mb-4">
            Compressed size: <b>{compressedSize} KB</b>
          </div>
        )}

        {compressedUrl && (
          <a
            href={compressedUrl}
            download="compressed-image.jpg"
            className="inline-block mt-4 px-6 py-3 rounded-xl
                       bg-indigo-600 text-white font-medium
                       hover:bg-indigo-700 transition"
          >
            Download Compressed Image
          </a>
        )}

        <p className="text-xs text-gray-400 mt-6 text-center">
          🔒 Image is processed locally in your browser.
        </p>

      </div>
    </motion.div>
  );
}

export default ImageCompress;
