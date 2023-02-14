import { useEffect, useState } from "react";
import styles from './ScrollToTop.module.scss';
import smoothscroll from 'smoothscroll-polyfill';
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    smoothscroll.polyfill();
     window.scroll({
      top: 0,
      behavior: "smooth"
    })
  };

  useEffect(() => {
    // Button is displayed after scrolling for 50 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 50) {
        setIsVisible(true);

      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button className={styles.scrollBtn} onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" /></svg>
        </button>
      )}
    </>
  );
}