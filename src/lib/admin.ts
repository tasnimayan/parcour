import { mockUsers, User, UserRole } from "./auth";

export const getAllUsers = (): User[] => {
  return mockUsers.map((user) => ({
    ...user,
    createdAt: "2024-01-01T00:00:00Z", // Mock creation date for reports
  }));
};

export const updateUserRole = async (
  userId: string,
  newRole: UserRole
): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userIndex = mockUsers.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error("User not found");
  }

  mockUsers[userIndex] = { ...mockUsers[userIndex], role: newRole };
  return mockUsers[userIndex];
};

export const deleteUser = async (userId: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userIndex = mockUsers.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error("User not found");
  }

  mockUsers.splice(userIndex, 1);
};

export const getDeliveryAgents = (): User[] => {
  return mockUsers.filter((user) => user.role === "agent");
};
