import { useStore } from 'app/providers/storeProvider';
import cls from './settingbar.module.scss';
import { Label } from 'shared/ui/Label/Label';
import { Input } from 'shared/ui/Input/Input';
import { createSettinbgBarConfig } from '../model/settingBarConfig';
import { observer } from 'mobx-react-lite';

export const SettingBar = observer(() => {
    const { toolStore } = useStore();

    const settingBarConfig = createSettinbgBarConfig(toolStore);

    return (
        <div className={cls.settingbar}>
            {settingBarConfig.map((seting) => (
                <div key={seting.id} className={cls.settingBarItem}>
                    <Label text={seting.label?.text} id={seting.label?.id} />
                    <Input
                        type={seting.input?.type}
                        id={seting.input?.id}
                        onChange={(e) => seting.input?.onChange(e)}
                        min={seting.input?.min}
                        max={seting.input?.max}
                        defaultValue={seting.input?.defaultValue}
                    />
                </div>
            ))}
        </div>
    );
});
