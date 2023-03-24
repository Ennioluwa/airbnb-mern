export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
export const setAccessToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refresh_token", refreshToken);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};
