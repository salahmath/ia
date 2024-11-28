import React, { useState } from "react";

const App = () => {
  const [response, setResponse] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchGeminiResponse = async () => {
    setLoading(true);
    const apiKey = "AIzaSyChWAGRjJ9JSoNesNTdkorE5pe-ipSq99M";
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  
    // Créer une chaîne de texte avec l'historique des questions et réponses
    const context = history.map(item => `Q: ${item.question}\nA: ${item.answer}`).join("\n");
  
    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `${context}\nQ: ${text}`, // Ajouter la nouvelle question à l'historique
            },
          ],
        },
      ],
    };
  
    try {
      const response = await fetch(`${endpoint}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error("API request failed");
      }
  
      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
  
      setResponse(generatedText);
      setHistory((prevHistory) => [
        ...prevHistory,
        { question: text, answer: generatedText },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to fetch response from Gemini API.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>AI Content Generator</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask something..."
        rows="4"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={fetchGeminiResponse}
        disabled={loading || !text}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Loading..." : "Get AI Response"}
      </button>

      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h3>AI Response:</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {response}
          </pre>
        </div>
      )}

      <h3 style={{ marginTop: "30px" }}>Conversation History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>Q:</strong> {item.question}
            <br />
            <strong>A:</strong> {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
