export interface UserDTO {
    id: number;
    email: string;
    avatar?: string;
  }

  export interface User {
    id: number;
    role: 'admin' | 'user';
    token: string;
    avatar?: string; 
  }