export interface UserDto {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  token: string;
  isAuthenticated: boolean;
}

export interface LoginFormDto {
  email: string;
  password: string;
}
