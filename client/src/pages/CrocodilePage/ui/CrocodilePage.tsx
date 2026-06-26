import React from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from 'widgets/CanvasBoard';
import { mods } from 'widgets/CanvasBoard/ui/Canvas';
import { SettingBar } from 'widgets/SettingBar';
import { ToolBar } from 'widgets/ToolBar';

const CrocodilePage = () => {
    const location = useLocation();
    const words = ['crocodile', 'crocodile-2players'];
    
    let mode: mods = 'crocodile1'; 
    
    if (location.pathname.includes(words[1])) {
        mode = 'crocodile2';
    } else if (location.pathname.includes(words[0])) {
        mode = 'crocodile1';
    }

    console.log(mode);
    

    return (
        <div>
            <ToolBar />
            <SettingBar />
            <Canvas mode={mode} />
        </div>
    );
};

export default CrocodilePage;
