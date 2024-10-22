import React, { useEffect, useRef } from 'react';

const TranslateComponent = () => {
  const googleTranslateRef = useRef(null);

  useEffect(() => {
    let intervalId;

    const checkGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        clearInterval(intervalId);
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          googleTranslateRef.current
        );
      }
    };

    intervalId = setInterval(checkGoogleTranslate, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);



  return (
    <div className=''>
      <div className=''  id='google_transalate'  ref={googleTranslateRef}>  </div>
    </div>
  );
};

export default TranslateComponent;
