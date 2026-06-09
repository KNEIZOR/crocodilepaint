import { BotModels } from "widgets/BotModels";
import BotModelsTools from "widgets/BotModelsTools/ui/BotModelsTools";
import { Canvas } from "widgets/CanvasBoard";
import { SettingBar } from "widgets/SettingBar";
import { ToolBar } from "widgets/ToolBar";

const CrocodilePage = () => {
    return (
        <div>
            <ToolBar />
            <SettingBar />
            <BotModels />
            <BotModelsTools />
            <Canvas />
        </div>
    );
};

export default CrocodilePage;
