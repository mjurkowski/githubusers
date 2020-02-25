import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

import { IUser } from '../../interfaces';
import { UsersListItem } from './UsersListItem';
import { Loader } from '../Loader';

interface IProps {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  users: IUser[];
  onLoadMore(): void;
}

export const UsersList: React.FC<IProps> = ({ hasNextPage, users, isNextPageLoading, onLoadMore }) => {
  const itemCount = hasNextPage ? users.length + 1 : users.length;

  const loadMoreItems = isNextPageLoading ? () => {} : onLoadMore;
 
  const isItemLoaded = (index: number): boolean => !hasNextPage || index < users.length;

  const Item = ({ index, style }: any) => {
    let content;
    if (!isItemLoaded(index)) {
      content = <Loader/>;
    } else {
      content = <UsersListItem user={users[index]} />;
    }
  
    return <div style={style}>{content}</div>;
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems as any}
        >
          {({ onItemsRendered, ref }) => (
            <List
              itemCount={itemCount}
              itemSize={54}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={width}
              height={height}
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}
