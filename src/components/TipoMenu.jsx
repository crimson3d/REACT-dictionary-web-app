import { useState } from "react";
import IconSearch from "@/assets/icon-arrow-down.svg?react";

const TipoMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Serif");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item, fontFamily) => {
    setSelectedItem(item);
    document.documentElement.style.setProperty("--font-family", fontFamily);
    setIsOpen(false);
  };

  return (
    <div className="right__menu">
      <span className="menu__font">{selectedItem}</span>
      <IconSearch  onClick={toggleMenu} className="font__icon" />
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
