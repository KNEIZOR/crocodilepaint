import { Canvas } from 'widgets/CanvasBoard';
import { SettingBar } from 'widgets/SettingBar';
import { ToolBar } from 'widgets/ToolBar';

const PaintOnlinePage = () => {
    return (
        <div>
            <ToolBar />
            <SettingBar />
            <Canvas />
        </div>
    );
};

export default PaintOnlinePage;
