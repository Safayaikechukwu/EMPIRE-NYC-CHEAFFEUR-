import { useEffect } from 'react';

export const TawkChat = () => {
  useEffect(() => {
    const tawkScript = () => {
      var Tawk_API: any = (window as any).Tawk_API || {}, Tawk_LoadStart = new Date();
      (function(){
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/69a5a211e2f23c1c34acb48c/1jing25oi';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        if (s0 && s0.parentNode) {
          s0.parentNode.insertBefore(s1, s0);
        }
      })();
    };

    tawkScript();
  }, []);

  return null; // Tawk.to handles its own UI
};
