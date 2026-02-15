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

      const res = await generateTestsFromRequirement(requirementText);
      setTests(res.tests);
    } catch (err) {
      setError("Failed to generate tests");
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
