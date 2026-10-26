import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, Plus, Trash2, Upload, X } from 'lucide-react';
import { api, assetUrl } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

// Convert stored value <-> form value
const toForm = (fields, item) =>
  Object.fromEntries(
    fields.map((f) => {
      const v = item?.[f.name];
      if (f.type === 'tags') return [f.name, (v || []).join(', ')];
      if (f.type === 'lines') return [f.name, (v || []).join('\n')];
      if (f.type === 'checkbox') return [f.name, !!v];
      return [f.name, v ?? f.default ?? (f.type === 'number' ? 0 : '')];
    })
  );

const toPayload = (fields, form) =>
  Object.fromEntries(
    fields.map((f) => {
      const v = form[f.name];
      if (f.type === 'tags') return [f.name, v.split(',').map((s) => s.trim()).filter(Boolean)];
      if (f.type === 'lines') return [f.name, v.split('\n').map((s) => s.trim()).filter(Boolean)];
      if (f.type === 'number') return [f.name, Number(v) || 0];
      return [f.name, v];
    })
  );

export default function Manager({ title, resource, fields, columns, singular }) {
  const { logout } = useAuth();
  const { refresh } = useData();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | {} (new) | item
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleAuth = useCallback(
    (e) => {
      if (e.status === 401) logout();
      setError(e.status ? e.message : 'Could not reach the server. Is the backend running?');
    },
    [logout]
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.list(resource));
      setError('');
    } catch (e) {
      handleAuth(e);
    } finally {
      setLoading(false);
    }
  }, [resource, handleAuth]);

  useEffect(() => {
    load();
  }, [load]);

  const openForm = (item) => {
    setEditing(item || {});
    setForm(toForm(fields, item));
    setError('');
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = toPayload(fields, form);
      if (editing._id) await api.update(resource, editing._id, payload);
      else await api.create(resource, payload);
      setEditing(null);
      await Promise.all([load(), refresh()]);
    } catch (err) {
      handleAuth(err);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete this ${singular}? This cannot be undone.`)) return;
    try {
      await api.remove(resource, item._id);
      await Promise.all([load(), refresh()]);
    } catch (err) {
      handleAuth(err);
    }
  };

  const upload = async (name, file) => {
    if (!file) return;
    try {
      const { url } = await api.upload(file);
      setForm((f) => ({ ...f, [name]: url }));
    } catch (err) {
      handleAuth(err);
    }
  };

  return (
    <div>
      <div className="mgr-head">
        <h2>{title}</h2>
        <button className="btn btn-primary btn-sm" onClick={() => openForm(null)}>
          <Plus size={16} /> Add {singular}
        </button>
      </div>

      {error && !editing && <p className="alert err">{error}</p>}
      {loading ? (
        <p className="muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="muted">Nothing here yet. Click “Add {singular}”.</p>
      ) : (
        <div className="table-wrap glass">
          <table>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it._id}>
                  {columns.map((c) => (
                    <td key={c.key}>{c.render ? c.render(it) : String(it[c.key] ?? '')}</td>
                  ))}
                  <td className="row-actions">
                    <button className="icon-btn" onClick={() => openForm(it)} aria-label="Edit">
                      <Pencil size={16} />
                    </button>
                    <button className="icon-btn danger" onClick={() => remove(it)} aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && setEditing(null)}>
            <motion.form className="modal glass" onSubmit={save} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
              <div className="mgr-head">
                <h3>
                  {editing._id ? 'Edit' : 'Add'} {singular}
                </h3>
                <button type="button" className="icon-btn" onClick={() => setEditing(null)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              {fields.map((f) => (
                <label key={f.name} className={f.type === 'checkbox' ? 'check' : ''}>
                  {f.label}
                  {f.type === 'textarea' || f.type === 'lines' ? (
                    <textarea rows={f.type === 'lines' ? 5 : 4} value={form[f.name]} placeholder={f.placeholder} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />
                  ) : f.type === 'select' ? (
                    <select value={form[f.name]} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}>
                      {f.options.map((o) => (
                        <option key={o.value ?? o} value={o.value ?? o}>
                          {o.label ?? o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === 'checkbox' ? (
                    <input type="checkbox" checked={form[f.name]} onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })} />
                  ) : f.type === 'image' ? (
                    <div className="img-field">
                      <input value={form[f.name]} placeholder="Image URL (optional)" onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />
                      <label className="btn btn-ghost btn-sm upload-btn">
                        <Upload size={14} /> Upload
                        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={(e) => upload(f.name, e.target.files[0])} />
                      </label>
                      {form[f.name] && <img src={assetUrl(form[f.name])} alt="" className="img-preview" />}
                      <small className="muted">Leave empty to auto-generate a preview from the live link.</small>
                    </div>
                  ) : (
                    <input
                      type={f.type === 'number' ? 'number' : 'text'}
                      required={f.required}
                      min={f.min}
                      max={f.max}
                      value={form[f.name]}
                      placeholder={f.placeholder}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    />
                  )}
                  {f.hint && <small className="muted">{f.hint}</small>}
                </label>
              ))}

              {error && <p className="alert err">{error}</p>}
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" disabled={busy}>
                  {busy ? 'Saving…' : 'Save'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
