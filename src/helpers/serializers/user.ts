import { IGitHubUser } from '../../services/api/api-client';
import { IUser } from '../../interfaces';

export const serializeUser = ({ login, id, avatar_url: avatar, url }: IGitHubUser): IUser => ({
  login,
  id, 
  avatar, 
  url
}) ;
