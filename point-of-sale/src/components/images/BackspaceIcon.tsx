import React, { FC, SVGProps } from 'react';

export const BackspaceIcon: FC<SVGProps<SVGSVGElement>> = ({ width = 34, height = 34 }) => {
    return (
        <svg width={width} height={height} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m6.01576 4.59905c.1889-.25124.48494-.39904.79928-.39904h16.18496c.5523 0 1 .44772 1 1v14.79999c0 .5523-.4477 1-1 1h-16.18496c-.31434 0-.61038-.1478-.79928-.399l-5.56391-7.4c-.267629-.356-.267628-.846.000001-1.2019z"
                fill="currentColor"
            />
            <path
                clipRule="evenodd"
                d="m9.18607 16.8884c-.24809.2543-.24809.6666 0 .9209.2481.2543.65035.2543.89843 0l4.3155-4.4233 4.3155 4.4233c.2481.2543.6503.2543.8984 0s.2481-.6666 0-.9209l-4.3155-4.4232 4.0524-4.15359c.2481-.25429.2481-.66658 0-.92088-.2481-.25429-.6504-.25429-.8985 0l-4.0523 4.15357-4.0523-4.15355c-.2481-.2543-.65038-.2543-.89848 0-.2481.25429-.2481.66658 0 .92088l4.05238 4.15357z"
                fill="#2a2a2a"
                fillRule="evenodd"
            />
        </svg>
    );
};
