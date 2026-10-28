import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container page center">
      <h1 className="big-404 grad-text">404</h1>
      <p className="muted">This page doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back home</Link>
    </div>
  );
}
