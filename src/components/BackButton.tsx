import React from 'react';
import { goBackOrReplace } from '../routes/history';

export const BackButton: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goBackOrReplace('/');
  }

  return <a href="/" className="nav-link" onClick={handleClick}>Back</a>
}
