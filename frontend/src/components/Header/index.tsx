import Button from '../Button/style';
import Logo from '../Logo';
import { ContainerHeader } from './style';

import { UseDash } from '../../Providers/dashboard';

const Header = () => {
    const { logout } = UseDash();

    return (
        <ContainerHeader>
            <div>
                <Logo />
                <Button onClick={() => logout()}>Sair</Button>
            </div>
        </ContainerHeader>
    );
};

export default Header;
