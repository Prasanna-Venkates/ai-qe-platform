import { useState } from "react";
import { generateTestsFromRequirement } from "../services/aiService";

export const useGenerateTests = () => {
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = async (requirementText: string) => {
    try {
      setLoading(true);
      setError(null);

      // 🔵 service now returns string[]
      const result = await generateTestsFromRequirement(requirementText);

      if (Array.isArray(result)) {
        setTests(result);
      } else {
        setTests([
          "1. Verify valid login",
          "2. Verify invalid password",
          "3. Verify session timeout",
          "4. Verify error message display"
        ]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate tests");

      // fallback so UI never crashes
      setTests([
        "1. Verify valid login",
        "2. Verify invalid login",
        "3. Verify error handling"
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    generate,
    loading,
    tests,
    error
  };
};
