import React, { useState, useEffect, useRef } from "react";
import './Chat.css';

function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false); 
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bem-vindo ao Chat da FURIA! O que você quer saber furioso?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUserChoice = (choice) => {
    let botResponse = "";
    let userDisplayText = "";

    switch (choice) {
      case "nextGame":
        userDisplayText = "Próximo Jogo";
        botResponse = "🔥 Nossa FURIA enfrenta a The MongolZ numa MD3 pelo torneio PGL Astana 2025 - 10/05 às 5h!";
        break;
      case "aboutTeam":
        userDisplayText = "Sobre o Time";
        botResponse = "🐾 Fundada em 2017, a FURIA é referência mundial em CS:GO! Com nossa Line-UP titular sendo composta por: Molodoy, Yekindar, Fallen, Kscerato e Yuurih. Tendo como reservas: Skullz e Chelo!";
        break;
      case "ranking":
        userDisplayText = "Ranking Atual";
        botResponse = "🏆 Atual Ranking HLTV: #17 do mundo!";
        break;
      case "lastResults":
        userDisplayText = "Últimos Resultados";
        botResponse = "✅ Últimos Jogos:\n- FURIA 0x2 The MongolZ\n- FURIA 0x2 Virtus.pro\n- FURIA 1x2 Complexity\n- FURIA 2X0 Betclic";
        break;
      case "buyMerch":
        userDisplayText = "Comprar Camisa";
        botResponse = (
          <>
            🛒 Compre produtos oficiais FURIA aqui:{" "}
            <a href="https://www.furia.gg" target="_blank" rel="noopener noreferrer" className="chat-link">
              www.furia.gg
            </a>
          </>
        );
        break;
      case "social":
        userDisplayText = "Redes Sociais"
        botResponse = (
          <>
            💬 Acesse as redes sociais da nossa FURIA:{" "}
            <a href="https://www.instagram.com/furiagg/" target="_blank" rel="noopener noreferrer" className="chat-link">
                Instagram
            </a>
            <a href="https://x.com/FURIA" target="_blank" rel="noopener noreferrer" className="chat-link">
                X
            </a>
            <a href="https://www.tiktok.com/@furia" target="_blank" rel="noopener noreferrer" className="chat-link">
                TikTok
            </a>
            <a href="https://www.twitch.tv/furiatv" target="_blank" rel="noopener noreferrer" className="chat-link">
                Twitch
            </a>
            <a href="https://www.youtube.com/furiagg" target="_blank" rel="noopener noreferrer" className="chat-link">
                Youtube
            </a>
          </>
        );
        break;
      default:
        userDisplayText = choice;
        botResponse = "Desculpe, não entendi! 🙃";
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { sender: "user", text: userDisplayText }
    ]);

    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: "bot", text: botResponse }
      ]);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([{ sender: "bot", text: "Chat limpo! O que você quer saber agora?" }]);
  };

  const renderMessageContent = (content) => {
    if (typeof content === 'string') {
      return content.split('\n').map((line, i) => (
        <span key={i}>{line}</span>
      ));
    }
    return content;
  };

  return (
    <>
      {/* Botão flutuante (mantido igual) */}
      {!isChatOpen && (
        <button className="chat-toggle-button" onClick={() => setIsChatOpen(true)}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" 
            alt="Abrir chat FURIA" 
            className="chat-icon"
          />
        </button>
      )}
  
      {/* Chat container */}
      {isChatOpen && (
        <div className="chat-widget-container">
          <div className="chat-header">
            <h3>Chat-bot da Furia!</h3>
            <button 
              className="close-chat-button"
              onClick={() => setIsChatOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="chat-container">
            {/* Área de mensagens com scroll */}
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <div className="message-text">
                    {renderMessageContent(msg.text)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message bot">
                  <div className="message-text typing-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Área de controles*/}
            <div className="chat-controls">
              <div className="options">
                <button className="option-button" onClick={() => handleUserChoice("nextGame")}>Próximo Jogo</button>
                <button className="option-button" onClick={() => handleUserChoice("aboutTeam")}>Sobre o Time</button>
                <button className="option-button" onClick={() => handleUserChoice("ranking")}>Ranking Atual</button>
                <button className="option-button" onClick={() => handleUserChoice("lastResults")}>Últimos Resultados</button>
                <button className="option-button" onClick={() => handleUserChoice("buyMerch")}>Comprar Camisa</button>
                <button className="option-button" onClick={() => handleUserChoice("social")}>Redes Sociais</button>
              </div>
              <button className="clear-button" onClick={clearChat}>
                Limpar Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;