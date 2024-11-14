import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from "styled-components/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const Container = styled(SafeAreaView)`
    flex: 1;
    padding: 24px;

    ${ ({theme}) => css`
        background-color: ${ theme.COLORS.GRAY_600 };
    `};
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Icon = styled(FontAwesome).attrs(({ theme }) => ({
        size: 56,
        color: theme.COLORS.WHITE
    })) `
    align-self: center;
`;