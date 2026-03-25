"use client";

import React, { useEffect, useState } from "react";
import Loader from "@utils/Loader";
import Loading from "@components/Loading";
import Content from "@components/Content";

/**
 * Wrapper that loads Pixi assets then renders the editor.
 * Used via dynamic import with ssr: false so Pixi/canvas code never runs during prerender.
 */
export default function EditorWithLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadError, setLoadError] = useState("");

  const loadResources = async () => {
    try {
      setLoadError("");
      setProgress(0);
      await Loader.load(
        (value) => setProgress(value),
        () =>
          setLoadError(
            "A resource failed to load. Check network/files and retry.",
          ),
      );
      setIsLoading(false);
    } catch {
      setLoadError("A resource failed to load. Check network/files and retry.");
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  if (isLoading) {
    return <Loading progress={progress} error={loadError} onRetry={loadResources} />;
  }

  return <Content />;
}
