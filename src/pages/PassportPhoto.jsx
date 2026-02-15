import { useState, useEffect } from "react";

import { motion } from "framer-motion";

function PassportPhoto() {
  useEffect(() => {
    document.title = "Passport Size Photo Maker for Government Forms | BytePlay";
  }, []);

  const [preview, setPreview] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Passport photo ratio (35mm x 45mm ≈ 7:9)
      const targetRatio = 7 / 9;

      let sx = 0,
        sy = 0,
        sw = img.width,
        sh = img.height;

      const currentRatio = img.width / img.height;

      if (currentRatio > targetRatio) {
        sw = img.height * targetRatio;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / targetRatio;
        sy = (img.height - sh) / 2;
      }

      const canvas = document.createElement("canvas");
      canvas.width = 350;
      canvas.height = 450;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 350, 450);

      canvas.toBlob((blob) => {
        setPreview(canvas.toDataURL("image/jpeg"));
        setDownloadUrl(URL.createObjectURL(blob));
      }, "image/jpeg");
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
          Passport Size Photo Maker
        </h2>

        <p className="text-gray-500 mb-6">
          Create passport size photos for Indian government forms.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mb-6"
        />

        {preview && (
          <div className="mb-6">
            <img
              src={preview}
              alt="Passport Preview"
              className="mx-auto border rounded"
            />
          </div>
        )}

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="passport-photo.jpg"
            className="inline-block px-6 py-3 rounded-xl
                       bg-indigo-600 text-white font-medium
                       hover:bg-indigo-700 transition"
          >
            Download Passport Photo
          </a>
        )}
<div className="mt-8 text-sm text-gray-600 leading-relaxed">
  <h3 className="font-semibold text-gray-800 mb-2">
    Passport Size Photo for Indian Forms
  </h3>
  <p>
    Passport size photos are required for Aadhaar updates, PAN applications,
    job forms, and government exams. This tool automatically resizes your photo
    to the standard passport size used in India.
  </p>

  <p className="mt-2">
    No software installation is required and your photo stays on your device.
  </p>
</div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          🔒 Photo is processed locally in your browser.
        </p>

      </div>
    </motion.div>
  );
}

export default PassportPhoto;
