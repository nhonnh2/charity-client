export const userReputation = 60;

// Calculate maximum emergency campaign amount based on reputation
const getMaxEmergencyAmount = (reputation: number) => {
  if (reputation >= 90) return 100000000; // 100M VND
  if (reputation >= 80) return 50000000; // 50M VND
  if (reputation >= 70) return 20000000; // 20M VND
  if (reputation >= 60) return 10000000; // 10M VND
  return 0; // Not eligible for emergency campaigns
};

export const maxEmergencyAmount = getMaxEmergencyAmount(userReputation);
export const canCreateEmergency = userReputation >= 60;
