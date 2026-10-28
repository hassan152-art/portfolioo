import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SpotlightCard from '../../components/SpotlightCard';

export default function Login() {
  const { token, login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (token) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email.trim(), password.trim());
      nav('/admin');
    } catch (err) {
      setError(err.status ? err.message : 'Could not reach backend API on port 5000. Ensure the server is running.');
    } finally {
      setBusy(false);
    }
  };

  const autofillCredentials = () => {
    setEmail('hassanahmedsiddiqui2007@gmail.com');
    setPassword('hassan');
    setError('');
  };

  return (
    <div className="container page login-wrap">
      <SpotlightCard className="form-card login-card glass" style={{ padding: '38px 30px' }}>
        <div className="icon-box big">
          <Lock size={28} />
        </div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Admin Dashboard Login</h1>
        <p className="muted small" style={{ marginBottom: '24px' }}>
          Sign in to manage projects, edit skills, and review visitor inquiries.
        </p>

        <form onSubmit={submit} style={{ textAlign: 'left' }}>
          <label>
            Admin Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="alert err" style={{ marginTop: '4px' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </p>
          )}

          <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={busy}>
            {busy ? 'Authenticating…' : 'Sign In as Admin'}
          </button>

          <div style={{ marginTop: '16px', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <button
              type="button"
              onClick={autofillCredentials}
              className="btn btn-ghost btn-sm"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
            >
              <KeyRound size={14} />
              <span>Auto-fill Hassan Credentials</span>
            </button>
          </div>
        </form>
      </SpotlightCard>
    </div>
  );
}
