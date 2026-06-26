import { Canvas } from 'widgets/CanvasBoard';
import { SettingBar } from 'widgets/SettingBar';
import { ToolBar } from 'widgets/ToolBar';

const PaintOnlinePage = () => {
    return (
        <div>
            <ToolBar />
            <SettingBar />
            <Canvas mode='paint' />
        </div>
    );
};

export default PaintOnlinePage;
