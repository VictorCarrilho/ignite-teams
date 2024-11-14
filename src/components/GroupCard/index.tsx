import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
}

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
        <Icon name="people-alt" />
        <Title>
            {title}
        </Title>
    </Container>
  )
}