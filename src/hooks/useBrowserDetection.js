import { useState, useEffect } from 'react';

const useBrowserDetection = () => {
  const [browser, setBrowser] = useState('');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('firefox')) {
      setBrowser('Firefox');
    } else if (userAgent.includes('chrome')) {
      setBrowser('Chrome');
    } else if (userAgent.includes('safari')) {
      setBrowser('Safari');
    } else if (userAgent.includes('opera') || userAgent.includes('opr')) {
      setBrowser('Opera');
    } else if (userAgent.includes('edge')) {
      setBrowser('Edge');
    } else if (userAgent.includes('ie')) {
      setBrowser('Internet Explorer');
    } else {
      setBrowser('Unknown');
    }
  }, []);

  return browser;
};

export default useBrowserDetection;