import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '~/components';
import { IButtonProps } from '~/components/library/Button/button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        children: { control: 'text' },
    },
} as Meta;

const Template: Story<IButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Button',
    onClick: action('clicked'),
};

export const Primary = Template.bind({});
Primary.storyName = 'Color: Primary';
Primary.args = {
    color: 'primary',
    children: 'primary button',
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
    ...Default.args,
    tooltip: 'This is a tooltip',
};

export const Loading = Template.bind({});
Loading.args = {
    ...Default.args,
    loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...Default.args,
    disabled: true,
};

export const Link = Template.bind({});
Link.args = {
    ...Default.args,
    link: 'hello',
    children: 'Link',
};

// Add more stories for different variants (color, size, shape, etc.) as needed
