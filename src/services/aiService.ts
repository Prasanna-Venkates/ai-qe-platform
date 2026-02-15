import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateTestsFromRequirement = async (text: string) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Generate manual test cases for:\n${text}` }]
    });

    const output = completion.choices[0]?.message?.content || "";
    return { tests: output.split("\n").filter(Boolean) };
  } catch (err: any) {
    // 🔵 Fallback mock when quota/billing blocks request
    return {
      tests: [
        "1. Verify valid login redirects to dashboard",
        "2. Verify invalid password shows error",
        "3. Verify account lock after 5 failed attempts",
        "4. Verify password field is masked"
      ]
    };
  }
};
