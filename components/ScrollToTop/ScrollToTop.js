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
          <i className="fa fa-chevron-up" aria-hidden="true"></i>
        </button>
      )}
    </>
  );
}