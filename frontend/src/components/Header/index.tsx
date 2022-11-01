import Button from '../Button/style';
import Logo from '../Logo';
import { ContainerHeader } from './style';

const Header = () => {
    return (
        <ContainerHeader>
            <div>
                <Logo />
                <Button>Sair</Button>
            </div>
        </ContainerHeader>
    );
};

export default Header;
