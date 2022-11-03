import { AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { ItemList } from './style';

const AdminItemList = () => {
    return (
        <ItemList>
            <div className="container-datas">
                <p>
                    <AiOutlineUser size={20} color="var(--blue)" />
                    teste@email.com
                </p>
                <p>
                    <BiTimeFive size={20} color="var(--blue)" />
                    25/10/2023
                </p>
            </div>
            <p className="description">Jogar Futebol </p>
        </ItemList>
    );
};

export default AdminItemList;
