export interface User {
  id: string;
  name: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  name: string;
  birthDate: Date;
}

export interface UserContextType {
  user: User | null;
  updateUser: (user: Partial<User>) => Promise<void>;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  clearUserData: () => Promise<void>;
} 