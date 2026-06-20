import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for forgot password API call would go here
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
        <div className="mb-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Назад
          </Link>
        </div>

        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Сброс пароля</h1>
              <p className="text-sm text-gray-500 mt-2">Введите ваш email, и мы отправим вам ссылку для сброса пароля.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors mt-2"
              >
                Отправить ссылку
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Проверьте почту</h1>
            <p className="text-sm text-gray-500 mt-2 px-4">
              Мы отправили ссылку для сброса пароля на <span className="font-bold text-gray-900">{email}</span>. Пожалуйста, проверьте ваш почтовый ящик.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => setSubmitted(false)}
                className="text-sm font-bold text-primary hover:underline"
              >
                Попробовать другой email
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          &copy; 2026 Executive Internet Magazine
        </p>
      </div>
    </div>
  );
};