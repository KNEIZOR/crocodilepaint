import React from 'react';
import { useCopyShareLink } from '../model/copyShareLink';
import Hint from 'shared/ui/Hint/Hint';

const CopyShareLink = () => {
    const { hintHide, copy } = useCopyShareLink();

    return (
        <>
            {hintHide && <Hint text="ссылка скопирована" />}
            <button onClick={copy}>скопировать ссылку</button>
        </>
    );
};

export default CopyShareLink;
