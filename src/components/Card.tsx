import React, { Fragment, ReactNode } from 'react'
import { cn } from '../lib/utils'
import Separator from './Separator'
interface CardType { children: ReactNode | ReactNode[], className?: string }

const Card: React.FC<CardType> = ({ children, className }) => {
    const filterArraychildren = Array.isArray(children) && children.filter(child => child !== false);
    const arrayLength = (filterArraychildren as JSX.Element[]).length - 1;

    return (
        <div className={cn('w-full flex justify-start items-start p-5 gap-6 border border-slate-300 dark:border-slate-700 rounded-md flex-col shadow-md', className)}>
            {Array.isArray(children) ? children.filter(child => child !== false).map((child, index) => child && (
                <Fragment key={index}>
                    {child}
                    {index !== arrayLength && <Separator />}
                </Fragment>
            )) : children}
        </div>
    )
}

export default Card