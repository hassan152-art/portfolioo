import { useCallback, useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function MessagesManager() {
  const { logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(null);

  const fail = useCallback(
    (e) => {
      if (e.status === 401) logout();
      setError(e.status ? e.message : 'Could not reach the server.');
    },
    [logout]
  );

  const load = useCallback(async () => {
    try {
      setItems(await api.list('messages'));
      setError('');
    } catch (e) {
      fail(e);
    } finally {
      setLoading(false);
    }
  }, [fail]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = async (m, read) => {
    try {
      await api.update('messages', m._id, { read });
      setItems((list) => list.map((x) => (x._id === m._id ? { ...x, read } : x)));
    } catch (e) {
      fail(e);
    }
  };

  const view = (m) => {
    setOpen(open === m._id ? null : m._id);
    if (!m.read) toggle(m, true);
  };

  const remove = async (m) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.remove('messages', m._id);
      setItems((list) => list.filter((x) => x._id !== m._id));
    } catch (e) {
      fail(e);
    }
  };

  return (
    <div>
      <div className="mgr-head">
        <h2>Messages</h2>
        <span className="muted">{items.filter((m) => !m.read).length} unread</span>
      </div>
      {error && <p className="alert err">{error}</p>}
      {loading ? (
        <p className="muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="muted">No messages yet.</p>
      ) : (
        <div className="msg-list">
          {items.map((m) => (
            <div key={m._id} className={`msg glass ${m.read ? '' : 'unread'}`}>
              <div className="msg-top" onClick={() => view(m)}>
                {m.read ? <MailOpen size={18} /> : <Mail size={18} />}
                <div className="msg-meta">
                  <strong>{m.name}</strong>
                  <span className="muted small">{m.subject || '(no subject)'}</span>
                </div>
                <span className="muted small">{new Date(m.createdAt).toLocaleDateString()}</span>
                <button
                  className="icon-btn danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(m);
                  }}
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {open === m._id && (
                <div className="msg-body">
                  <p>{m.message}</p>
                  <a className="link-arrow" href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Your message')}`}>
                    Reply to {m.email}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
