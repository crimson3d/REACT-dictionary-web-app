import Logo from "@/assets/logo.svg?react";
import TipoMenu from "./TipoMenu";
import LightBlackToggle from "./LightBlackToggle";

const Header = () => {
    return (
        <header className="main__top">
            <Logo height={35} width={35} className="top__logo" />
            <div className="top__right">
                <TipoMenu />
                <LightBlackToggle />
            </div>
        </header>
    );
};

export default Header;