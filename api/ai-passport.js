import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // ✅ ALWAYS SET CORS FIRST
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ PRE-FLIGHT MUST EXIT IMMEDIATELY
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const form = formidable({ multiples: false });

  try {
    const [fields, files] = await form.parse(req);
    const imageFile = files.image?.[0];

    if (!imageFile) {
      return res.status(400).end();
    }

    const imageBuffer = fs.readFileSync(imageFile.filepath);
    const base64Image = imageBuffer.toString("base64");

    const prompt = `
Create a professional passport-size color photograph suitable for official uploads with the following specifications:

Photo dimensions: 35 mm × 35 mm
Resolution: 300 PPI
File format: JPG
File size: Under 1 MB
Background must be plain white or off-white, evenly lit
Attire should be formal and professional
Avoid white clothing if background is white
Both shoulders and ears must be clearly visible
Subject should be looking directly at the camera
Head upright, not tilted
Expression neutral
Lighting balanced, no harsh shadows
Face should occupy approximately 70–80% of the image height
No filters, selfies, or casual backgrounds
Final image must pass government, academic, and corporate verification checks
`;

    const imagenRes = await fetch(
      "https://generativelanguage.googleapis.com/v1/images:generate?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "imagen-3.0-generate-002",
          prompt,
          image: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
          size: "1024x1024",
        }),
      }
    );

    const imagenData = await imagenRes.json();

    if (!imagenData?.images?.[0]?.image) {
      console.error("Imagen error:", imagenData);
      return res.status(500).end();
    }

    const outputImage = Buffer.from(
      imagenData.images[0].image,
      "base64"
    );

    res.setHeader("Content-Type", "image/jpeg");
    return res.status(200).send(outputImage);
  } catch (err) {
    console.error("AI passport error:", err);
    return res.status(500).end();
  }
}
