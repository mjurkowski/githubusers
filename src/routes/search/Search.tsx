import React, { useState, useRef } from 'react';
import { ApiClient } from '../../services/api/api-client';
import { UsersList, Layout } from '../../components/';
import { serializeUser } from '../../helpers/serializers';
import { IUser } from '../../interfaces';

const RESULTS_PER_PAGE = 50;

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const page = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const hasNextPage = useRef(!!query);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const handleLoadMore = () => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    page.current = page.current + 1;
    ApiClient.searchUsers(query, RESULTS_PER_PAGE, page.current)
      .then(response => {
        hasNextPage.current =
          page.current * RESULTS_PER_PAGE < response.total_count;
        setUsers([...users, ...response.items.map(serializeUser)]);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    hasNextPage.current = query !== '';
    page.current = 0;

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setUsers([]);
    }, 500);
  };

  return (
    <Layout>
      <div className="form-group">
        <input type="text" className="form-control" value={query} onChange={handleChange} placeholder="Search user" />
        <small className="form-text text-muted">You can use nick name or full name</small>
      </div>
      <div className="layout-list-container">
        {query && <UsersList
          users={users}
          isNextPageLoading={isLoading}
          hasNextPage={hasNextPage.current}
          onLoadMore={handleLoadMore}
        />}
        
      </div>
    </Layout>
  );
};
