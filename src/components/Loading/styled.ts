import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    ${ ({theme}) => css`
        background-color: ${ theme.COLORS.GRAY_600 };
    `};
    
`;

export const LoadIndicator = styled.ActivityIndicator
    .attrs(({ theme }) => ({
        color: theme.COLORS.GREEN_700
    }))`
`;