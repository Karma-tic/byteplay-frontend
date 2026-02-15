import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable();

  try {
    const [fields, files] = await form.parse(req);
    const imageFile = files.image?.[0];

    if (!imageFile) {
      return res.status(400).json({ error: "No image uploaded" });
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
Final image must pass government and academic verification checks
`;

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await geminiRes.json();

    const imagePart =
      geminiData.candidates?.[0]?.content?.parts?.find(
        (p) => p.inlineData
      );

    if (!imagePart) {
      throw new Error("No image returned from AI");
    }

    const outputImage = Buffer.from(
      imagePart.inlineData.data,
      "base64"
    );

    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).send(outputImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI processing failed" });
  }
}
