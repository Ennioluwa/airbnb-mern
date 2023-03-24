interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}
interface Places {
  title: string;
  address: string;
  addedPhotos: string[];
  photoLink: string;
  description: string;
  perks: string[];
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
}
