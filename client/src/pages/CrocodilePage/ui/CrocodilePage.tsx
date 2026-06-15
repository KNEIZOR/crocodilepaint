import React from 'react';
import { Canvas } from 'widgets/CanvasBoard';
import { SettingBar } from 'widgets/SettingBar';
import { ToolBar } from 'widgets/ToolBar';

const CrocodilePage = () => {
    return (
        <div>
            <ToolBar />
            <SettingBar />
            <Canvas />
        </div>
    );
};

export default CrocodilePage;