import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <Link to="editor">Login</Link>
      <Link to="wat">Non-existing page</Link>
    </div>
  );
}
