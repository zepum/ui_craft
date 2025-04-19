import type { Story } from '@ladle/react';
import { usePane } from '../src/usePane';

export const TweakPane: Story = () => {
    const pane = usePane({
        title: 'Debug',
    });

    return <div />;
};
