export interface LoginBody {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
  token: string;
  avatar?: string; 
}


