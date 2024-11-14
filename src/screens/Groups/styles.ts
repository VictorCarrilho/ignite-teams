import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    padding: 24px;

    ${ ({theme}) => css`
        background-color: ${ theme.COLORS.GRAY_600 };
    `};
`;