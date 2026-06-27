import { Canvas } from 'widgets/CanvasBoard';
import { SettingBar } from 'widgets/SettingBar';
import { ToolBar } from 'widgets/ToolBar';
import { useCrocodileMode } from '../model/useCrocodileMode';
import ConfirmReady from 'features/confirmReady/ui/ConfirmReady';

const CrocodilePage = () => {
    const mode = useCrocodileMode();

    return (
        <div>
            {mode === 'crocodile2' && <ConfirmReady />}
            <ToolBar />
            <SettingBar />
            <Canvas mode={mode} />
        </div>
    );
};

export default CrocodilePage;
