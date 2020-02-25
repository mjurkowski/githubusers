import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { UsersList, Layout } from '../../components/';
import { ApiClient } from '../../services/api/api-client';
import { serializeUser } from '../../helpers/serializers';
import { IUser } from '../../interfaces';

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const handleLoadMore = () => {
    setIsLoading(true);
    const since = users.length ? users[users.length - 1].id : 0;
    ApiClient.getUsers(since).then((response) => {
      setUsers([...users, ...response.map(serializeUser)])
      setIsLoading(false);
    })
  };

  return (
    <Layout rightBtn={<Link className="nav-link" to="/search">Search</Link>}>
      <div className="layout-list-container">
        <UsersList users={users} isNextPageLoading={isLoading} hasNextPage onLoadMore={handleLoadMore} />
      </div>
    </Layout>
  )
}
