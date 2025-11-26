import { GoogleGenAI } from "@google/genai";
import { EventData } from "../types";

export const generateProposalContent = async (data: EventData): Promise<{ summary: string; setlist: string[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Atue como um produtor musical de eventos de luxo. Com base nos dados abaixo, gere dois outputs em formato JSON:
    1. "summary": Um parágrafo elegante e persuasivo (em português) descrevendo o conceito musical para este evento, focado em vender a experiência para o cliente. Use tom profissional e sofisticado.
    2. "setlist": Uma lista de 8 músicas sugeridas que se encaixem no perfil dos convidados e no tipo de evento, respeitando o que NÃO tocar.

    DADOS DO EVENTO:
    Tipo: ${data.eventType}
    Perfil Convidados: ${data.guestProfile}
    Formação: ${data.formation}
    Interação: ${data.expectedInteraction}
    O que NÃO tocar: ${data.doNotPlay}
    Gostos Musicais: ${data.tasteDiversity}
    Momentos: ${data.musicMoments.join(', ')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return { summary: "Não foi possível gerar o conteúdo.", setlist: [] };

    const parsed = JSON.parse(text);
    return {
      summary: parsed.summary || "",
      setlist: Array.isArray(parsed.setlist) ? parsed.setlist : [],
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "Erro ao gerar proposta com IA. Verifique sua chave de API.",
      setlist: []
    };
  }
};