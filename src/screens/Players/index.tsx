import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Keyboard, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';


import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import * as S from './styles';


type RouteParams = {
    group: string;
}

export function Players(){
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const [newPlayerName, setNewPlayerName] = useState<string>('');

    const route = useRoute();
    const navigation = useNavigation();
    const { group } = route.params as RouteParams;
    const newPlayerNameInputRef = useRef<TextInput>(null);


    async function handleAddPlayer(){
        if(newPlayerName.trim().length === 0){
            return Alert.alert("Nova Pessoa", "Você deve informar um nome para a pessoa.");
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();
            Keyboard.dismiss();

            setNewPlayerName('');
            fetchPlayersByTeam();            

        } catch (error) {
            error instanceof AppError ? Alert.alert('Nova Pessoa', error.message)
                                    : Alert.alert('Nova Pessoa', 'Não foi possivel adicionar.');    
        }
    }
    
    function handleRemovePlayer(playerName: string){
        try {
            Alert.alert('Remover player', `Remover o player ${playerName}?`, [
                { 
                    text: 'Sim', 
                    onPress: async () => {
                        await playerRemoveByGroup(playerName, group);
                        fetchPlayersByTeam();
                    }
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]);
            
        } catch (error) {
            Alert.alert("Remover player", "Nâo foi possivel remover esse player.");
        }
    }

    function handleGroupRemove(){
            Alert.alert('Remover grupo', `Remover o grupo ${group}?`, [
                { 
                    text: 'Sim', 
                    onPress: async () => groupRemove()
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]);
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            Alert.alert("Remover grupo", "Nâo foi possivel remover esse grupo.");
        } 
    }

    async function fetchPlayersByTeam(){
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);

        } catch (error) {
            Alert.alert("Pessoas", "Não foi possivel carregar as pessoas filtradas pelo time.");
        }
    }


    useEffect(() => { 
        fetchPlayersByTeam();
    }, [team]);


    return(
        <S.Container>
            <Header showBackButton />
            <Highlight 
                title={group}
                subtitle="adicione a galera e separe os times"
            />

            <S.Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={text => setNewPlayerName(text)}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
                />
                
                <ButtonIcon 
                    icon="add" 
                    type="PRIMARY"
                    onPress={handleAddPlayer} 
                />
            </S.Form>
            
            <S.HeaderList>
                <FlatList 
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={ ({ item }) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        /> 
                    )}

                    horizontal
                />

                <S.NumbersOfPlayers>{players.length}</S.NumbersOfPlayers>
            </S.HeaderList>       
            
            <FlatList 
                data={players}
                keyExtractor={item => item.name}
                renderItem={ ({ item }) => (
                    <PlayerCard 
                        name={item.name}
                        onRemove={() => handleRemovePlayer(item.name)}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message="Não há pessoas nesse time." />
                )}

                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}
            />

            <Button 
                title="Remover time"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />
        </S.Container>
    )
}