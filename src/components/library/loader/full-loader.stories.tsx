import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FullLoader, {
    IFullLoader,
} from '~/components/library/loader/full-loader';

export default {
    title: 'Components/Overlay Loader',
    component: FullLoader,
    argTypes: {
        children: { control: 'text' },
    },
} as Meta;

const Template: Story<IFullLoader> = (args) => <FullLoader {...args} />;

export const ActiveLoader = Template.bind({});
ActiveLoader.storyName = 'Loader:Active';
ActiveLoader.args = {
    state: true,
};
