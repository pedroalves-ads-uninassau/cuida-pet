import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  const { message } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({
      reply: "⚠️ Modo de Teste (Sem Chave de API): Olá! Eu sou o Jarvis. Como não estou conectado ao cérebro da OpenAI no momento, só posso responder coisas básicas. Mas adoraria saber mais sobre seu pet!"
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é o Jarvis, o assistente virtual do Cuida Pet. Sua missão é ajudar tutores de animais a encontrar clínicas, agendar consultas e tirar dúvidas sobre cuidados com pets. Seja sempre educado, prestativo e use emojis para tornar a conversa mais leve. O Cuida Pet conecta tutores e clínicas veterinárias." },
        { role: "user", content: message }
      ]
    });

    return Response.json({
      reply: completion.choices[0].message.content
    });
  } catch (error) {
    console.error("OpenAI Error:", error);

    // Smart Fallback (Simulated AI for Demo/Quota issues)
    const lowerMsg = message.toLowerCase();
    let fakeReply = "";

    if (lowerMsg.includes("olá") || lowerMsg.includes("oi") || lowerMsg.includes("bom dia")) {
      fakeReply = "Olá! Sou o Jarvis (Modo Simplificado). Como posso ajudar você e seu pet hoje? 🐾";
    } else if (lowerMsg.includes("agendar") || lowerMsg.includes("consulta") || lowerMsg.includes("marcar")) {
      fakeReply = "Para agendar uma consulta, vá até a aba 'Agendamentos' no menu inferior ou busque uma clínica no Mapa! 🏥";
    } else if (lowerMsg.includes("clínica") || lowerMsg.includes("veterinário")) {
      fakeReply = "Temos várias clínicas parceiras! Dê uma olhada no Mapa para encontrar a mais próxima de você.";
    } else if (lowerMsg.includes("banho") || lowerMsg.includes("tosa")) {
      fakeReply = "Muitas clínicas parceiras oferecem Banho e Tosa. Você pode ver os serviços detalhados no perfil de cada clínica.";
    } else if (lowerMsg.includes("obrigado") || lowerMsg.includes("valeu")) {
      fakeReply = "Por nada! Estou sempre aqui para ajudar. 🐶💙";
    } else {
      fakeReply = "Como estou sem conexão com minha inteligência central (Erro de Cota da API), só consigo responder coisas básicas sobre agendamentos e clínicas. Tente perguntar sobre 'agendar' ou 'clínicas'!";
    }

    return Response.json({
      reply: fakeReply
    });
  }
}
