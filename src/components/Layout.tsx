import React from 'react';
import { NavBar } from './NavBar';

interface IProps {
  rightBtn?: React.ReactNode;
}

export const Layout: React.FC<IProps> = ({ children, rightBtn }) => (
  <>
    <NavBar rightBtn={rightBtn}/>
    <div className="container pt-5 flex-fill">
      {children}
    </div>
  </>
) 
