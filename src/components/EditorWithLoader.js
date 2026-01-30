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

  useEffect(() => {
    const loadResources = async () => {
      await Loader.load();
      setIsLoading(false);
    };

    loadResources();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <Content />;
}
