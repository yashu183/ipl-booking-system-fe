import { jwtDecode } from 'jwt-decode';

export const getUserId = () => {
    const token  = localStorage.getItem('token');

    if (!token) {
      throw new Error("No token found!");
    }
  
    const userDetails = jwtDecode(token);
    return userDetails.userId ?? 0;
}

export const getUserRole = () => {
  const token  = localStorage.getItem('token');

  if (!token) {
    throw new Error("No token found!");
  }

  const userDetails = jwtDecode(token);
  return userDetails.role ?? null;
}