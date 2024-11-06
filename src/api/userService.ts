import axios, { AxiosResponse } from 'axios';
import { User } from '../types';

const BASE_URL = 'http://localhost:3033/api/users';

export const getUsers = (): Promise<AxiosResponse<User[]>> => axios.get<User[]>(BASE_URL);

export const createUser = (user: FormData): Promise<void> => {
  return axios
    .post(BASE_URL, user, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })
    .then(() => {
      console.log('User created successfully.');
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      throw error; 
    });
};

export const updateUser = (id: string, user: FormData): Promise<void> => {
  return axios
    .put(`${BASE_URL}/${id}`, user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      console.log('User updated successfully.');
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      throw error;
    });
};

export const deleteUser = (id: string): Promise<void> => {
  return axios.delete(`${BASE_URL}/${id}`)
    .then(() => {
     
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      
    });
};
