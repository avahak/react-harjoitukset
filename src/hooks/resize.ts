export { useWindowSize };
import { useState, useLayoutEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

/**
 * Calls callback when window size changes. Wrap callback with useCallback
 * to avoid infinite loop.
 */
const useWindowSize = (callback: (size: WindowSize) => void) => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        const newSize: WindowSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        setWindowSize(newSize);
        // Call the provided callback with the updated window size:
        callback(newSize);
    };

    useLayoutEffect(() => {
        handleResize();          // cannot do this - would lead to infinite loop
        // Initial call to handleResize and add event listener:
        window.addEventListener('resize', handleResize);
        // Cleanup the event listener on component unmount:
        return () => window.removeEventListener('resize', handleResize);
    }, [callback]);
    return windowSize;
};