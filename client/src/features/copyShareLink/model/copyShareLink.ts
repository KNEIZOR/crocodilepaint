import { useRef, useState } from 'react';

export const useCopyShareLink = () => {
    const [hintHide, setHintHide] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const copy = () => {
        navigator.clipboard.writeText(window.location.href);
        setHintHide(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setTimeout(() => {
            setHintHide(false);
        }, 2500);
    };

    return { hintHide, copy };
};
