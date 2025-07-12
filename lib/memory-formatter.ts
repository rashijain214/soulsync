export function formatMemoryProfile(memoryProfile: any): string {
  if (!memoryProfile) {
    return "No memory profile available.";
  }

  const { resume, goals, journals } = memoryProfile;

  return `
PROFESSIONAL BACKGROUND:
${resume || 'Not provided'}

GOALS & ASPIRATIONS:
${goals || 'Not provided'}

PERSONAL REFLECTIONS & EXPERIENCES:
${journals || 'Not provided'}

MEMORY PROFILE CREATED: ${memoryProfile.createdAt ? new Date(memoryProfile.createdAt).toLocaleDateString() : 'Unknown'}
  `.trim();
}

export function validateMemoryProfile(memoryProfile: any): boolean {
  return memoryProfile && 
         memoryProfile.resume && 
         memoryProfile.goals && 
         memoryProfile.journals;
}