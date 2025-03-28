import React, { ReactNode, useEffect, useState } from 'react';
import { cn } from '~/utils/className';

export interface ITabChild {
    value: number;
    label: string;
    component: React.ComponentType;
}

export interface ITabsProps {
    children: React.ReactNode;
    value: number;
    onChange: (value: number) => void;
}
const map_component = {};

const Tabs: React.FC<ITabsProps> & { Tab: React.FC<ITabChild> } = ({
    children,
    onChange,
    value,
}) => {
    const [current_value, setValue] = useState<number | undefined>();

    function changeValue(val: number) {
        onChange(val);
        setValue(val);
    }

    useEffect(() => {
        changeValue(value);
    }, []);

    function mapValueComponent(obj: ITabChild) {
        map_component[obj.value] = obj.component;
    }

    const RenderCurrentTab = map_component[current_value] || (() => null);

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4 border-2 border-rose-800">
                    {React.Children.map(children, (child) => {
                        const tabChildProps = child.props as ITabChild;
                        mapValueComponent(tabChildProps);
                        return React.cloneElement(child, {
                            changeValue,
                            current_value,
                        });
                    })}
                </div>
                <div className="border-2 border-green-400">
                    <RenderCurrentTab />
                </div>
            </div>
        </>
    );
};

const TabChild: React.FC<
    ITabChild & { changeValue: (val: number) => void; current_value: number }
> = ({ value, label, component, changeValue, current_value }) => {
    return (
        <>
            <div
                className={cn('w-max cursor-pointer select-none p-4', {
                    'border-b-2 border-danger font-bold':
                        current_value === value,
                })}
                onClick={() => changeValue(value)}
            >
                {label}
            </div>
        </>
    );
};

Tabs.Tab = TabChild;

Tabs.displayName = 'Tabs';
export default Tabs;
