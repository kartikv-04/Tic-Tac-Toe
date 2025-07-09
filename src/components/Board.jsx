import React, { useState } from 'react';
import Square from './Square';

function Board() {
    const [state, setState] = useState(Array(9).fill(null));
    const [isXturn, setXTurn] = useState(true);

    function handleClick(index) {
        // Prevent overwriting or further clicks after game is over
        if (state[index] || calculateWinner(state)) return;

        const copy = [...state];
        copy[index] = isXturn ? 'X' : 'O';
        setState(copy);
        setXTurn(!isXturn);
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
                return squares[a]; // "X" or "O"
            }
        }
        return null;
    }

    const winner = calculateWinner(state);
    const isDraw = state.every(cell => cell !== null) && !winner;
    const status = winner
        ? `${winner} Won the Game!`
        : isDraw
        ? "It's a Draw!"
        : `Turn: ${isXturn ? 'X' : 'O'}`;

    function resetGame() {
        setState(Array(9).fill(null));
        setXTurn(true);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
            <div className="text-2xl font-semibold mb-2">{status}</div>

            <div className="grid grid-cols-3 gap-2">
                {state.map((value, index) => (
                    <Square key={index} value={value} onClick={() => handleClick(index)} />
                ))}
            </div>

            <button
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Reset Game
            </button>
        </div>
    );
}

export default Board;
