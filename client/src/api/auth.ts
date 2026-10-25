import request from './request.ts';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserInfo {
  id: string;
  username: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}

export interface LoginResponse {
  code: number;
  message: string;
  token: string;
  user: UserInfo;
}

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return request.post<LoginResponse>("/auth/login", credentials)
    .then((response) => response.data);
}

/*
export function getCurrentUser() {
  return request.get("/auth/currentUser")
    .then((response) => response.data);
}*/

export function logout() {
  return request.post("/auth/logout")
    .then((response) => response.data);
}
