import { useState } from 'react';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import * as S from './styles';
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';


export function NewGroup(){
    const [group, setGroup] = useState('');
    const navigation = useNavigation();

    async function handleNew(){
        try {
            if(group.trim().length === 0){
                return Alert.alert("Novo Grupo", "Você deve informar o nome da turma.");
            }

            await groupCreate(group);
            navigation.navigate('players', { group });

        } catch (error) {
            error instanceof AppError ? Alert.alert("Novo Grupo", error.message)
                                    : Alert.alert("Não foi possivel criar um novo grupo");
        }        
    }

    return(
        <S.Container>
            <Header showBackButton />
            <S.Content>
                <S.Icon name="users" />

                <Highlight 
                    title="Nova turma" 
                    subtitle="Crie a turma para adicionar as pessoas"
                />
                
                <Input 
                    placeholder="Nome da turma"
                    onChangeText={setGroup} 
                />

                <Button 
                    title ="Criar" 
                    style={{ marginTop: 20}}   
                    onPress={handleNew} 
                />
            </S.Content>
        </S.Container>
    )
}