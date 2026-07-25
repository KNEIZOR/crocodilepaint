import { Canvas } from 'widgets/CanvasBoard';
import { SettingBar } from 'widgets/SettingBar';
import { ToolBar } from 'widgets/ToolBar';
import { useCrocodileMode } from '../model/useCrocodileMode';
import ConfirmReady from 'features/confirmReady/ui/ConfirmReady';
import { WordChoice } from 'features/word-choice/ui/WordChoice';
import { useState } from 'react';
import { useStore } from 'app/providers/storeProvider';
import { observer } from 'mobx-react-lite';

const CrocodilePage = observer(() => {
    const [choisenWord, setChoisenWord] = useState<string | null>(null);
    const { sessionStore } = useStore();

    const mode = useCrocodileMode();

    return (
        <div>
            {mode === 'crocodile2' && <ConfirmReady />}
            {!choisenWord && (
                <WordChoice
                    onSelect={(word) => {
                        setChoisenWord(word);
                        sessionStore.socket?.send(
                            JSON.stringify({
                                method: 'setWord',
                                word,
                            }),
                        );
                    }}
                />
            )}
            <ToolBar />
            <SettingBar />
            <Canvas mode={mode} word={choisenWord} />
        </div>
    );
});

export default CrocodilePage;
