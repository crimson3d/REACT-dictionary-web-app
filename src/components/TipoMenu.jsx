import { useState, useEffect } from "react";
import IconSearch from "@/assets/icon-arrow-down.svg?react";

const TipoMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Serif");

  useEffect(() => {
    // Al cargar la página, recuperar la tipografía seleccionada de localStorage
    const savedFont = localStorage.getItem("selectedFont");
    const savedFontFamily = localStorage.getItem("selectedFontFamily");

    if (savedFont && savedFontFamily) {
      setSelectedItem(savedFont);
      document.documentElement.style.setProperty("--font-family", savedFontFamily);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item, fontFamily) => {
    setSelectedItem(item);
    document.documentElement.style.setProperty("--font-family", fontFamily);
    setIsOpen(false);

    // Guardar la elección en localStorage
    localStorage.setItem("selectedFont", item);
    localStorage.setItem("selectedFontFamily", fontFamily);
  };

  return (
    <div className="right__menu">
      <span className="menu__font">{selectedItem}</span>
      <IconSearch onClick={toggleMenu} className="font__icon" />
      {isOpen && (
        <ul className="menu__items">
          <li
            className="items__item serif__font"
            onClick={() => selectItem("Serif", "Lora, Times, serif")}
          >
            Serif
          </li>
          <li
            className="items__item sans__serif__font"
            onClick={() => selectItem("Sans Serif", "Inter, sans-serif")}
          >
            Sans Serif
          </li>
          <li
            className="items__item monospace__font"
            onClick={() => selectItem("Monospace", "Inconsolata, monospace")}
          >
            Monospace
          </li>
        </ul>
      )}
    </div>
  );
};

export default TipoMenu;
