import { useStore } from 'app/providers/storeProvider';
import Button from 'shared/ui/Button/Button';
import { createToolbarConfig } from '../model/toolBarConfig';
import { Input } from 'shared/ui/Input/Input';
import { observer } from 'mobx-react-lite';
import cls from './toolbar.module.scss';

export const ToolBar = observer(() => {
    const { canvasStore, toolStore, sessionStore } = useStore();

    const download = () => {
        const dataUrl = canvasStore.canvas?.toDataURL();
        console.log(dataUrl);
        const a = document.createElement('a');
        if (dataUrl) {
            a.href = dataUrl;

            a.download = sessionStore.sessionId + '.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const toolBarConfig = createToolbarConfig({
        canvasStore,
        toolStore,
        sessionStore,
        download,
    });

    return (
        <div className={cls.toolbar}>
            {toolBarConfig.map((item) => {
                if (item.type === 'button') {
                    return (
                        <Button
                            key={item.className}
                            style={{
                                backgroundImage: item.icon
                                    ? `url(${item.icon})`
                                    : undefined,
                                width: '25px',
                                height: '25px',
                                margin: '0 0 0 10px',
                            }}
                            onClick={() => item.onClick()}
                        />
                    );
                }
                if (item.type === 'input') {
                    return (
                        <Input
                            key={item.inputType}
                            type={item.inputType}
                            onChange={(value) => item.onChange(value)}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
});
