import React, { useEffect, useState } from "react";

const usePlatformDetection = () => {
  const [platform, setPlatform] = useState("");
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("windows")) {
      setPlatform("Windows");
    } else if (
      userAgent.includes("macintosh") ||
      userAgent.includes("mac os")
    ) {
      setPlatform("Mac OS");
    } else if (userAgent.includes("android")) {
      setPlatform("Android");
    } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      setPlatform("iOS");
    } else if (userAgent.includes("linux")) {
      setPlatform("Linux");
    } else {
      setPlatform("Unknown");
    }
  }, []);
  return platform;
};

export default usePlatformDetection;
