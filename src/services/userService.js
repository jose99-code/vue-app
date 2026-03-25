import { fetcher } from "./api";

export const getUsers = () => fetcher('/users');

export const createUser = (data) => fetcher('/users', {
    method: 'POST',
    body: JSON.stringify(data),
});

export const updateUser = (id, data) =>
  fetcher(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteUser = (id) =>
  fetcher(`/users/${id}`, {
    method: 'DELETE',
  });
