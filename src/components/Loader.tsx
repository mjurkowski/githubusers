import React from 'react';

export const Loader: React.FC = () => (
  <div className="progress" style={{ height: '20px' }}>
    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '100%' }}>Loading...</div>
  </div>
)
