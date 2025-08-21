"use client";

import { useState, useCallback } from "react";

export function useAdminState() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  }, []);

  const showSuccess = useCallback((message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  }, []);

  const clearMessages = useCallback(() => {
    setError("");
    setSuccess("");
  }, []);

  return {
    loading,
    setLoading,
    error,
    success,
    showError,
    showSuccess,
    clearMessages,
  };
}
