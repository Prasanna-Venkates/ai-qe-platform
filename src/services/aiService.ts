// services/aiService.ts

export async function generateTestsFromRequirement(prompt: string) {
    try {
      // If API key exists → real AI
      const apiKey = import.meta.env.VITE_OPENAI_KEY;
  
      if (apiKey) {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: `Generate test cases:\n${prompt}`,
              },
            ],
          }),
        });
  
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content || "";
  
        return text.split("\n").filter(Boolean);
      }
  
      // 🟢 DEMO MODE (no key)
      console.log("Running in DEMO AI mode");
  
      await new Promise((r) => setTimeout(r, 2000));
  
      return [
        "1. Verify valid login redirects to dashboard",
        "2. Verify invalid password shows error",
        "3. Verify account lock after 5 attempts",
        "4. Verify password field is masked",
      ];
    } catch (err) {
      console.log("AI fallback triggered");
  
      return [
        "1. Verify valid login redirects to dashboard",
        "2. Verify invalid password shows error",
        "3. Verify account lock after 5 attempts",
        "4. Verify password field is masked",
      ];
    }
  }
  