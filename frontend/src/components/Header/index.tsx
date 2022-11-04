import { ContainerHeader } from './style';

import Button from '../Button/style';
import Logo from '../Logo';

import { UseAuth } from '../../Providers/auth/index';

const Header = () => {
    const { logout } = UseAuth();

    const handleClick = () => {
        logout();
    };

    return (
        <ContainerHeader>
            <div>
                <Logo />
                <Button onClick={() => handleClick()}>Sair</Button>
            </div>
        </ContainerHeader>
    );
};

export default Header;
