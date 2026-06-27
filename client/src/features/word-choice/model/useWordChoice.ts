import { words } from 'pages/CrocodilePage/model/consts/words';
import { useState, useEffect } from 'react';


export function useWordChoice(count = 5) {
    const [options, setOptions] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        setOptions(shuffled.slice(0, count));
    }, [count]);

    return {
        options,
        selected,
        select: setSelected,
    };
}
