import { TouchableOpacityProps } from 'react-native';
import { ButtonIconTypeStyleProps, Container, Icon } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStyleProps;
    onPress: () => void;
}

export function ButtonIcon({ icon, type = "PRIMARY", onPress }: Props){
    return(
        <Container
            onPress={onPress}
        >
            <Icon 
                name={icon}
                type={type} 
            />
        </Container>
    )
}