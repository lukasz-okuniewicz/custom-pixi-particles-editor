"use client";

import React, { useEffect, useState } from "react";
import Loader from "@utils/Loader";
import Loading from "@components/Loading";
import Content from "@components/Content";

const Home = () => {
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

  return (
    <>
      <Content />
    </>
  );
};

export default Home;
