// src/stories/Tabs.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Tabs, { ITabsProps, ITabChild } from '~/components/library/tabs/tabs';

export default {
    title: 'Components/Tabs',
    component: Tabs,
} as Meta;

const Template: Story<ITabsProps> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
    value: 1, // Set your default tab value here
    onChange: action('onChange'), // Use the action addon to capture the custom event
    children: [
        <Tabs.Tab
            key={1}
            value={1}
            label="Tab 1"
            component={() => <div>Tab 1 Content</div>}
        />,
        <Tabs.Tab
            key={2}
            value={2}
            label="Tab 2"
            component={() => <div>Tab 2 Content</div>}
        />,
        // Add more tabs as needed
    ],
};
