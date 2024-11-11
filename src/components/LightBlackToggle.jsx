import { useState, useEffect } from "react";
import IconMoon from "@/assets/icon-moon.svg?react";
import IconMoonPurple from "@/assets/icon-moon-purple.svg?react";

const LightBlackToggle = () => {
  const [isToggle, setToggle] = useState(false);
  const [isSystemDarkMode, setSystemDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (systemPrefersDark) {
      setToggle(true);
      setSystemDarkMode(true);
      root.style.setProperty('--primary-color', 'var(--primary-color-dark)');
      root.style.setProperty('--secondary-color', 'var(--secondary-color-dark)');
      root.style.setProperty('--text-color', 'var(--text-color-dark)');
      root.style.setProperty('--input-background', 'var(--input-background-dark)');
    } else {
      setSystemDarkMode(false);
      root.style.setProperty('--primary-color', 'var(--primary-color-light)');
      root.style.setProperty('--secondary-color', 'var(--secondary-color-light)');
      root.style.setProperty('--text-color', 'var(--text-color-light)');
      root.style.setProperty('--input-background', 'var(--input-background-light)');
    }

    const mediaQueryListener = (e) => {
      setSystemDarkMode(e.matches);
      if (e.matches) {
        setToggle(true);
        root.style.setProperty('--primary-color', 'var(--primary-color-dark)');
        root.style.setProperty('--secondary-color', 'var(--secondary-color-dark)');
        root.style.setProperty('--text-color', 'var(--text-color-dark)');
        root.style.setProperty('--input-background', 'var(--input-background-dark)');
      } else {
        setToggle(false);
        root.style.setProperty('--primary-color', 'var(--primary-color-light)');
        root.style.setProperty('--secondary-color', 'var(--secondary-color-light)');
        root.style.setProperty('--text-color', 'var(--text-color-light)');
        root.style.setProperty('--input-background', 'var(--input-background-light)');
      }
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaQueryListener);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaQueryListener);
    };
  }, []);

  const handleToggle = () => {
    setToggle(prevToggle => !prevToggle);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isToggle) {
      root.style.setProperty('--primary-color', 'var(--primary-color-dark)');
      root.style.setProperty('--secondary-color', 'var(--secondary-color-dark)');
      root.style.setProperty('--text-color', 'var(--text-color-dark)');
      root.style.setProperty('--input-background', 'var(--input-background-dark)');
    } else {
      root.style.setProperty('--primary-color', 'var(--primary-color-light)');
      root.style.setProperty('--secondary-color', 'var(--secondary-color-light)');
      root.style.setProperty('--text-color', 'var(--text-color-light)');
      root.style.setProperty('--input-background', 'var(--input-background-light)');
    }
  }, [isToggle]);

  return (
    <div className="right__right">
      <div className="right__separator"></div>
      <div className="right__toggle">
        <label className="toggle__switch">
          <input type="checkbox" checked={isToggle} onChange={handleToggle} />
          <span className="switch__slider round"></span>
        </label>
      </div>
      {isSystemDarkMode || isToggle ? (
        <IconMoonPurple height={25} width={25} />
      ) : (
        <IconMoon height={25} width={25} />
      )}
    </div>
  );
};

export default LightBlackToggle;
