

export const demoAccounts = {
  ADMIN: {
    email: "admin@gmail.com",
    password: "Password123",
    label: "Admin",
    description: "Manage drivers, hospitals & dispatch",
  },
  PATIENT: {
    email: "aronno@gmail.com",
    password: "Password123",
    label: "Patient",
    description: "Request emergency ambulance",
  },
  DRIVER: {
    email: "driver@gmail.com",
    password: "Password123",
    label: "Driver",
    description: "Accept & manage trips",
  },
} as const;