// GOOGLE AI STUDIO — GEMINI API
// Wire after GitHub export
// Model: gemini-2.0-flash

export interface AICompatibilityResult {
  name: string;
  jazz: "YES" | "PARTIAL" | "NO";
  zong: "YES" | "PARTIAL" | "NO";
  ufone: "YES" | "PARTIAL" | "NO";
  bands: string;
}

export async function checkCompatibilityAI(
  query: string,
): Promise<AICompatibilityResult | null> {
  // TODO: Gemini API call goes here
  // Returns: { name, jazz, zong, ufone, bands }
  console.log("AI check:", query);
  return null; // falls back to phones.json
}
