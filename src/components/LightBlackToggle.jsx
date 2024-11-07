import { useState } from "react";
import IconMoon from "@/assets/icon-moon.svg?react";
import IconMoonPurple from "@/assets/icon-moon-purple.svg?react";

const LightBlackToggle = () => {
  const [isToggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!isToggle);
  };

  return (
    <div className="right__right">
      <div className="right__separator"></div>
      <div className="right__toggle">
        <label className="toggle__switch">
          <input type="checkbox" checked={isToggle} onChange={handleToggle} />
          <span className="switch__slider round"></span>
        </label>
      </div>
      {isToggle ? <IconMoonPurple height={25} width={25} /> : <IconMoon height={25} width={25} />}
    </div>
  );
};

export default LightBlackToggle;
