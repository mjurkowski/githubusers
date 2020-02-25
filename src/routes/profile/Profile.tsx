import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import {
  ApiClient,
  IFullGitHubUser,
} from '../../services/api/api-client';
import { usePromise } from '../../hooks/';
import { Layout } from '../../components/';

export const Profile: React.FC<{}> = () => {
  const { login } = useParams();

  const getUserProfilePromise = useCallback(
    () => login && ApiClient.getUser(login),
    [login]
  );

  const [, isProfileLoading, user] = usePromise<IFullGitHubUser>(
    getUserProfilePromise as any,
    true
  );

  if (isProfileLoading) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="well profile">
            <div className="row">
              <div className="col-xs-12 col-sm-8">
                <h2>{user?.name}</h2>
                <p>
                  <small>
                    {user?.login} | {user?.email}
                  </small>
                </p>
                <p>
                  <strong>Bio: </strong> {user?.bio}
                </p>
              </div>
              <div className="col-xs-12 col-sm-4 text-center">
                <figure>
                  <img
                    src={user?.avatar_url}
                    alt=""
                    className="img-thumbnail img-responsive"
                  />
                </figure>
              </div>
            </div>
            <div className="row divider text-center">
              <div className="col-xs-12 col-sm-3 emphasis">
                <h2>
                  <strong>{user?.followers}</strong>
                </h2>
                <p>
                  <small>Followers</small>
                </p>
              </div>
              <div className="col-xs-12 col-sm-3 emphasis">
                <h2>
                  <strong>{user?.following}</strong>
                </h2>
                <p>
                  <small>Following</small>
                </p>
              </div>
              <div className="col-xs-12 col-sm-3 emphasis">
                <h2>
                  <strong>{user?.public_repos}</strong>
                </h2>
                <p>
                  <small>Repositories</small>
                </p>
              </div>
              <div className="col-xs-12 col-sm-3 emphasis">
                <h2>
                  <strong>{user?.public_gists}</strong>
                </h2>
                <p>
                  <small>Gists</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
