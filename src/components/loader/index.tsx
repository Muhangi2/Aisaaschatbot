import React from 'react';
import { Spinner } from '../spinner';

type LoaderProps = {
    loading: boolean;
    children: React.ReactNode;
};

export const Loader = ({ loading, children }: LoaderProps) => {
    return loading ? (
        <div className="w-full py-5 flex justify-center" aria-label="Loading content">
            <Spinner />
        </div>
    ) : (
        <>{ children }</>
    );
};