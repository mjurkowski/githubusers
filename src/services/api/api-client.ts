function getQueryString<T extends { [key: string]: any}>(params: T): string {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

export interface IGitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  name: string;
}

export interface IFullGitHubUser extends IGitHubUser {
  email: string;
  hireable: boolean;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

interface IGitHubSearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IGitHubUser[];
}

const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const authHeaders = {
  'Authorization': `token ${TOKEN}`
};

const headers = new Headers(process.env.NODE_ENV !== 'production' ? authHeaders : {});


const API_URL = 'https://api.github.com';

export class ApiClient {
  
  static searchUsers(query: string, limit: number = 20, page: number = 0): Promise<IGitHubSearchUsersResponse> {
    return fetch(`${API_URL}/search/users?${getQueryString({ q: query, page })}`, { headers }).then(response => response.json())
  }

  static getUsers(since: number = 0): Promise<IGitHubUser[]> {
    return fetch(`${API_URL}/users?${getQueryString({ since })}`, { headers }).then(response => response.json())
  }

  static getUser(login: string): Promise<IGitHubUser> {
    return fetch(`${API_URL}/users/${login}`, { headers }).then(response => response.json())
  }
}
