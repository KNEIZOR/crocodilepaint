import { Canvas } from 'widgets/CanvasBoard';
import { SettingBar } from 'widgets/SettingBar';
import { ToolBar } from 'widgets/ToolBar';
import { useCrocodileMode } from '../model/useCrocodileMode';
import ConfirmReady from 'features/confirmReady/ui/ConfirmReady';
import { WordChoice } from 'features/word-choice/ui/WordChoice';
import { useState } from 'react';

const CrocodilePage = () => {
    const [choisenWord, setChoisenWord] = useState<string | null>(null);

    console.log(choisenWord);

    const mode = useCrocodileMode();

    return (
        <div>
            {mode === 'crocodile2' && <ConfirmReady />}
            {!choisenWord && (
                <WordChoice onSelect={(word) => setChoisenWord(word)} />
            )}
            <ToolBar />
            <SettingBar />
            <Canvas mode={mode} word={choisenWord} />
        </div>
    );
};

export default CrocodilePage;
