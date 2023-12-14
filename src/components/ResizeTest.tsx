import { useCallback } from 'react';
import { useWindowSize } from '../hooks/resize';

const ResizeTest: React.FC = () => {
    const windowSize = useWindowSize(useCallback((size) => {
        console.log('Window size changed:', size);
    }, []));

    return (
        <div>
            <p>Window Width: {windowSize.width}</p>
            <p>Window Height: {windowSize.height}</p>
        </div>);
};

export default ResizeTest;
