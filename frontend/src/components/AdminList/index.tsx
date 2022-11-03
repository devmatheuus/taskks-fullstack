import Button from '../Button/style';

import { AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { StyledAdminListContainer } from './style';
import AdminItemList from '../AdminItemList/index';

const AdminList = () => {
    return (
        <StyledAdminListContainer>
            <div className="container">
                <ul className="container-infos">
                    <AdminItemList />
                    <AdminItemList />
                    <AdminItemList />
                </ul>
            </div>
            <div className="container-buttons">
                <Button>Anterior</Button>
                <Button>Próxima</Button>
            </div>
        </StyledAdminListContainer>
    );
};

export default AdminList;
