import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GameContext, useGameContext } from '../../hooks/gameContext';
import Table from '../../components/Table';
import { sendMove } from '../../api';
import { useAuth } from '../../hooks/authContext';


const TableScreen = () => {
    const route = useRoute<any>();
    const gameCtx = useGameContext();
    const auth = useAuth();
    

    useEffect(() => {
        gameCtx.loadGame(route.params.gameId)
    }, [])
    return (
        <SafeAreaView>
            <Text>Game</Text>
            <Table state={gameCtx.tableState} onClick={(cell) => sendMove(auth.token, route.params.gameId, cell)}/>
        </SafeAreaView>
    )
}
export default () => (
    <GameContext>
        <TableScreen/>
    </GameContext>
);
