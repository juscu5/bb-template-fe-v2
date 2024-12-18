import { ApiService } from '.';

interface ProfileResponse {
  status: string;
  code: number;
  payload: {};
}

export const isLoggedInApi = async (
  token: string
): Promise<ProfileResponse> => {
  const response = await ApiService.get('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.data;
  return data;
};
