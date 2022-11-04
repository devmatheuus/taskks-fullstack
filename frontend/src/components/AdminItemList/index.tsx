import { AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { ItemList } from './style';
import { ITasksDatas, IListTasksResponse } from '../../interfaces/admin/index';

interface IRenderTask {
    task: {
        email: string;
        description: string;
        deadline: string;
    };
}

const AdminItemList = ({ task }: IRenderTask) => {
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
