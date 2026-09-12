import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AICoach = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hi! I'm your AI Fitness & Nutrition Specialist. I can help you create custom diet plans, analyze diagnostic reports, and optimize your workout routines. What can I assist you with today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (location.state?.prefillMessage) {
      setInput(location.state.prefillMessage);
    }
  }, [location.state]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const { data } = await axios.post('/chatbot', {
        message: userMessage, 
        history: messages 
      });

      setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
    } catch (error) {
      if (error.response) {
        console.error('Error from server:', error.response.data);
        setMessages((prev) => [...prev, { role: 'model', text: "I'm having trouble. Make sure the GEMINI_API_KEY is configured on the backend!" }]);
      } else {
        console.error('Network Error:', error);
        setMessages((prev) => [...prev, { role: 'model', text: "There was a network error. Is the server running?" }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4rem)', padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
        <h1 className="title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bot size={28} color="var(--primary)" /> AI Diet Coach
        </h1>
        <p className="subtitle">Powered by Gemini. Ask me about customizable diet plans and requirements.</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            gap: '0.5rem'
          }}>
            {msg.role === 'model' && (
              <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', height: 'fit-content' }}>
                <Bot size={20} color="var(--primary)" />
              </div>
            )}
            <div style={{
              background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface)',
              color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              borderTopRightRadius: msg.role === 'user' ? 0 : '1rem',
              borderTopLeftRadius: msg.role === 'model' ? 0 : '1rem',
              maxWidth: '80%',
              boxShadow: 'var(--shadow)',
              lineHeight: '1.5'
            }}>
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div style={{ padding: '0.5rem', background: 'var(--primary)', borderRadius: '50%', height: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <User size={20} color="#fff" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '0.5rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', height: 'fit-content' }}>
              <Bot size={20} color="var(--primary)" />
            </div>
            <div style={{ background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '1rem', borderTopLeftRadius: 0 }}>
              <span className="pulse-text">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a high-protein vegetarian diet plan..."
          className="form-input"
          style={{ flex: 1, margin: 0, borderRadius: '2rem' }}
          disabled={loading}
        />
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !input.trim()}
          style={{ borderRadius: '2rem', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default AICoach;
