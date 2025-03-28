import React from 'react';
import { cn } from '~/utils/className';

interface IRippleEffect {
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    icon_button?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const RippleEffect: React.FC<IRippleEffect> = ({
    children,
    loading,
    disabled,
    icon_button,
    onClick,
}) => {
    function createRipple(event: React.MouseEvent<HTMLDivElement>) {
        if (loading || disabled) {
            return;
        }

        // * currentTarget returns the which node listen for that event currently
        const button = event.currentTarget;

        // creating the span element directly
        const circle = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const diameter = Math.max(button.clientWidth, button.clientHeight);

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        //adding the ripple animation class

        circle.classList.add('custom_ripple');

        const ripple = button.getElementsByClassName('custom_ripple')[0];
        // ** on click in the button it removes the old ripple and append the new ripple and the new animation is rendering
        //remove the span ripple is there is already there so we start the animation from the beginning

        if (ripple) {
            ripple.remove();
        }

        //append the span ripple in the DOM
        button.appendChild(circle);

        // Add event listener for animationend
        circle.addEventListener('animationend', () => {
            circle.remove();
        });

        // perform the onClick callback function
        onClick && onClick(event);
    }

    return (
        <>
            <div onClick={createRipple} className={cn('custom_btn', 'w-max')}>
                {/* {children} */}
            </div>
        </>
    );
};

export default RippleEffect;
