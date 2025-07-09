import React from 'react';

function Square({ onClick, value }) {
    return (
        <button
            onClick={onClick}
            className="w-20 h-20 border-2 border-black text-2xl font-bold flex items-center justify-center"
        >
            {value}
        </button>
    );
}

export default Square;
