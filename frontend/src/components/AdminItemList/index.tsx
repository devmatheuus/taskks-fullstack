import { AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';

import { ItemList } from './style';
import { IRenderAdminTasks } from '../../interfaces/tasks/index';

const AdminItemList = ({ task }: IRenderAdminTasks) => {
    const { deadline, description, email } = task;

    return (
        <ItemList>
            <div className="container-datas">
                <div>
                    <p>
                        <AiOutlineUser size={20} color="var(--blue)" />
                        {email}
                    </p>
                </div>
                <div>
                    <p>
                        <BiTimeFive size={20} color="var(--blue)" />
                        {deadline}
                    </p>
                </div>
            </div>
            <p className="description">{description} </p>
        </ItemList>
    );
};

export default AdminItemList;
