import { useState, useEffect } from "react";
import IconMoon from "@/assets/icon-moon.svg?react";
import IconMoonPurple from "@/assets/icon-moon-purple.svg?react";

const LightBlackToggle = () => {
  const [isToggle, setToggle] = useState(() => {
    // Recuperar el estado del modo desde localStorage
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode === null ? false : JSON.parse(savedMode);
  });
  const [isSystemDarkMode, setSystemDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const applyTheme = (isDark) => {
      if (isDark) {
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
    };

    applyTheme(isToggle); // Aplicar el tema basado en el estado guardado

    if (systemPrefersDark) {
      setSystemDarkMode(true);
      applyTheme(true);
    } else {
      setSystemDarkMode(false);
      applyTheme(false);
    }

    const mediaQueryListener = (e) => {
      setSystemDarkMode(e.matches);
      applyTheme(e.matches);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaQueryListener);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaQueryListener);
    };
  }, [isToggle]);

  const handleToggle = () => {
    const newToggleState = !isToggle;
    setToggle(newToggleState);
    // Guardar el estado en localStorage
    localStorage.setItem("isDarkMode", JSON.stringify(newToggleState));
  };

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (isDark) => {
      if (isDark) {
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
    };

    applyTheme(isToggle); // Aplicar el tema basado en el estado actual
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
