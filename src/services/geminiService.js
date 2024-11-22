import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imageBuffer, tipo = "descricao") {
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";
  if (tipo == "alt") {
    prompt = "Gere um alt text em português do brasil para a seguinte imagem";
  }

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/jpg",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text();
  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}