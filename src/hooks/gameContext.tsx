import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {loadGame} from '../api';
import { useAuth } from './authContext';

export type XAxis = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type YAxis = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type CellId = `${XAxis}${YAxis}`;
export type CellValue = 'x' | '0' | '';

export interface ICell {
    value: CellValue;
    id: CellId
}


interface User {
    createdAt: string;
    user: any;
    game?: string;
    userId: number;
    gameId: number
}

interface Move {
    createdAt: string;
    userId: number;
    cell: CellId;
    gameId: number

}

enum GameStatus {
    CREATED = "CREATED",
    MAP_CONFIG = "MAP_CONFIG",
    ACTIVATE = "ACTIVE",
    FINISHED = "FINISHED" 
}

interface Game {
    createdAt: string;
    id: number;
    users: User[];
    winnerId: number;
    moves: Move[];
    playerToMove: number;
    status: GameStatus
}

interface GameContext {
    game: Game | null;
    loadGame: (id: number) => Promise<void>;
    tableState: ICell[][];
}

const Context = createContext<GameContext>({
    loadGame: () => Promise.resolve(),
    game: null,
    tableState: []
});

const baseTableState: ICell[][] = [
    [{id: 'A1', value: ''}, {id: 'A2', value: ''}, {id: 'A3', value: ''}, {id: 'A4', value: ''}, {id: 'A5', value: ''}, {id: 'A6', value: ''}, {id: 'A7', value: ''}, {id: 'A8', value: ''}, {id: 'A9', value: ''}, {id: 'A10', value: ''}],
    [{id: 'B1', value: ''}, {id: 'B2', value: ''}, {id: 'B3', value: ''}, {id: 'B4', value: ''}, {id: 'B5', value: ''}, {id: 'B6', value: ''}, {id: 'B7', value: ''}, {id: 'B8', value: ''}, {id: 'B9', value: ''}, {id: 'B10', value: ''}],
    [{id: 'C1', value: ''}, {id: 'C2', value: ''}, {id: 'C3', value: ''}, {id: 'C4', value: ''}, {id: 'C5', value: ''}, {id: 'C6', value: ''}, {id: 'C7', value: ''}, {id: 'C8', value: ''}, {id: 'C9', value: ''}, {id: 'C10', value: ''}],
    [{id: 'D1', value: ''}, {id: 'D2', value: ''}, {id: 'D3', value: ''}, {id: 'D4', value: ''}, {id: 'D5', value: ''}, {id: 'D6', value: ''}, {id: 'D7', value: ''}, {id: 'D8', value: ''}, {id: 'D9', value: ''}, {id: 'D10', value: ''}],
    [{id: 'E1', value: ''}, {id: 'E2', value: ''}, {id: 'E3', value: ''}, {id: 'E4', value: ''}, {id: 'E5', value: ''}, {id: 'E6', value: ''}, {id: 'E7', value: ''}, {id: 'E8', value: ''}, {id: 'E9', value: ''}, {id: 'E10', value: ''}],
    [{id: 'F1', value: ''}, {id: 'F2', value: ''}, {id: 'F3', value: ''}, {id: 'F4', value: ''}, {id: 'F5', value: ''}, {id: 'F6', value: ''}, {id: 'F7', value: ''}, {id: 'F8', value: ''}, {id: 'F9', value: ''}, {id: 'F10', value: ''}],
    [{id: 'G1', value: ''}, {id: 'G2', value: ''}, {id: 'G3', value: ''}, {id: 'G4', value: ''}, {id: 'G5', value: ''}, {id: 'G6', value: ''}, {id: 'G7', value: ''}, {id: 'G8', value: ''}, {id: 'G9', value: ''}, {id: 'G10', value: ''}],
    [{id: 'H1', value: ''}, {id: 'H2', value: ''}, {id: 'H3', value: ''}, {id: 'H4', value: ''}, {id: 'H5', value: ''}, {id: 'H6', value: ''}, {id: 'H7', value: ''}, {id: 'H8', value: ''}, {id: 'H9', value: ''}, {id: 'H10', value: ''}],
    [{id: 'I1', value: ''}, {id: 'I2', value: ''}, {id: 'I3', value: ''}, {id: 'I4', value: ''}, {id: 'I5', value: ''}, {id: 'I6', value: ''}, {id: 'I7', value: ''}, {id: 'I8', value: ''}, {id: 'I9', value: ''}, {id: 'I10', value: ''}],
    [{id: 'J1', value: ''}, {id: 'J2', value: ''}, {id: 'J3', value: ''}, {id: 'J4', value: ''}, {id: 'J5', value: ''}, {id: 'J6', value: ''}, {id: 'J7', value: ''}, {id: 'J8', value: ''}, {id: 'J9', value: ''}, {id: 'J10', value: ''}],
]

export const GameContext: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [game, setGame] = useState<Game | null>(null);
    const [tableState, setTableState] = useState<ICell[][]>([]);
    const auth = useAuth();
    const loopRef = useRef<NodeJS.Timeout>();

    const gameToTabelState = () => {
        if (!game) return baseTableState;
        const movesMap: Partial<{[key in CellId]: CellValue}> = {};
        game.moves.forEach(move => {
            let value: CellValue = '';
            if (move.userId === game.users[0].userId) {
                value = 'x';
            } else {
                value = '0';
            }
            movesMap[move.cell] = value;
        });
        return baseTableState.map(
            row => row.map(({id, value}) => ({id, value: movesMap[id] || value}))
        )
    }

    const handleLoadGame = async (id: number) => {
        const result = await loadGame(auth.token, id);
        setGame(result);
    }

    useEffect(() => {
        setTableState(gameToTabelState());
    }, [game]);

    useEffect(() => {
        loopRef.current = setInterval(() => {
            if (game) {
                handleLoadGame(game.id)
            }
        }, 1000);
        return () => {
            clearInterval(loopRef.current)
        }
    }, [game])

    return (<Context.Provider value={{loadGame: handleLoadGame, game, tableState}}>
        {children}
    </Context.Provider>)
};

export const useGameContext = () => useContext(Context);
