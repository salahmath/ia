import React, { useEffect, useRef, useState } from 'react'; 
import { useParams } from 'react-router-dom'; // Import pour récupérer les paramètres
import "./dash.css";
import { FaSearchengin } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import model from '../../lib/gemini';

function Dashbord() {
  const endRef = useRef(null);
  const [question, setQuestion] = useState(""); // User's input
  const [messages, setMessages] = useState([]); // Array of messages (user + AI)
  const { id } = useParams(); // Récupère l'ID de la conversation via l'URL

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Scroll when messages change

  // Charger l'historique des messages lors du chargement du composant
  useEffect(() => {
    const fetchConversation = async () => {
      if (!id) return; // Si pas d'ID, ne rien faire

      try {
        const response = await axios.get(`http://localhost:5000/conversation/${id}`);
        setMessages(response.data.messages); // Charge les messages existants
      } catch (error) {
        console.error("Erreur lors du chargement de la conversation :", error);
      }
    };

    fetchConversation();
  }, [id]);

  const handleSubmit = async () => {
    if (question.trim() === '') return; // Ignorer les entrées vides

    const userMessage = {
      sender: 'user',
      text: question,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      await axios.post(`http://localhost:5000/conversation/${id}/message`, {
        sender: 'user',
        text: question,
      });

      // Appeler l'API pour générer la réponse de l'IA
      const conversationContext = messages
        .map((msg) => `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.text}`)
        .join('\n');
      const prompt = `${conversationContext}\nUser: ${question}\nAI:`;

      const result = await model.generateContent(prompt);
      const aiText = result.response.candidates[0].content.parts[0].text;

      // Ajouter la réponse de l'IA
      const aiMessage = {
        sender: 'ia',
        text: aiText,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      // Ajouter le message de l'IA au backend
      await axios.post(`http://localhost:5000/conversation/${id}/message`, {
        sender: 'ia',
        text: aiText,
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }

    // Réinitialiser le champ de saisie
    setQuestion('');
  };
  

  return (
    <section>
      <div className="chat1">
        <div className="wra">
          <div className="ch">
            {messages.map((msg, index) => (
              <p key={index} className={msg.sender}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </p>
            ))}
            <div ref={endRef} />
          </div>
        </div>

        <div className="btnSearch">
          <input
            type="text"
            className="search"
            placeholder="Message SALAH IA"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <FaSearchengin className="search-icon" onClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
}

export default Dashbord;
