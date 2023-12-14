import { useCallback, useState } from "react";
import { useWindowSize } from "../hooks/resize";
import { Link } from "react-router-dom";

import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const TopMenu: React.FC = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
    const [mobileView, setMobileView] = useState<boolean>(true);

    useWindowSize(useCallback((size) => {
        // Handle window size changes here if needed
        setMobileView(size.width < 600);
    }, []));

    const mobileNav = 
        <div id="top-menu" className="top-menu-mobile">
            <div className="top-menu-basic">
                <div className="top-menu-group">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => {setHamburgerOpen((flag) => !flag)}}>
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className="top-menu-group">
                    <Link to="/">
                        <img src="./src/assets/react.svg"></img>
                    </Link>
                </div>
                <div className="top-menu-group">
                    <Link to="/login">Login</Link>
                    <Link to="/login">Register</Link>
                </div>
            </div>
            { hamburgerOpen ? 
            <div className="top-menu-mobile-bottom">
                <Link to="/">Home</Link>
                <Link to="/anecdotes">Anecdotes</Link>
                <Link to="/resize">Resize</Link>
                <Link to="/todo">Todo</Link>
            </div>
            : <></> }
        </div>;

    const wideNav = 
        <div id="top-menu" className="top-menu-basic">
            <div className="top-menu-group">
                <Link to="/">
                    <img src="./src/assets/react.svg"></img>
                </Link>
                <Link to="/">Home</Link>
                <Link to="/anecdotes">Anecdotes</Link>
                <Link to="/resize">Resize</Link>
                <Link to="/todo">Todo</Link>
            </div>
            <div className="top-menu-group">
                <Link to="/login">Login</Link>
                <Link to="/login">Register</Link>
            </div>
        </div>;

    return (
        <nav>
        { mobileView ? mobileNav : wideNav }
        </nav>);
};

export default TopMenu;