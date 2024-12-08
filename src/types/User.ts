export interface userSignUpInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  budget: number;
}

export interface userLoginInfo {
  email: string;
  password: string;
}

export interface authenticatedContextType {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}
