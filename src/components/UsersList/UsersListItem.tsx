import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces';

interface IProps {
  user: IUser;
}

export const UsersListItem: React.FC<IProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="media mb-1">
      <Link to={`/profile/${user.login}`} className="d-flex align-items-center">
        <img src={user.avatar} className="mr-3" width="50" height="50" alt="avatar" />
        <div className="media-body">
          <h5>{user.login}</h5>
        </div>
      </Link>
    </div>
  )
}
