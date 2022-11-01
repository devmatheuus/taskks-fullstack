import Button from '../Button/style';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiTodoLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { FiEdit2 } from 'react-icons/fi';
import { StyledTask } from './style';

const Task = () => {
    return (
        <StyledTask>
            <div className="container-button">
                <Button>
                    <AiOutlineCheck color="var(--blue)" size={25} />
                </Button>
            </div>

            <div className="container-task">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor doloribus reiciendis aperiam aut autem provident
                    praesentium voluptatibus? Illo nihil ratione laudantium
                    consequuntur quidem fugit adipisci. Deserunt alias in natus
                    ipsum.
                </p>
            </div>

            <div className="container-infos">
                <span>
                    <RiTodoLine /> 22/10/2002
                </span>
                <span>
                    <BiTimeFive /> 30/05/2009
                </span>
            </div>

            <div className="container-edit">
                <Button>
                    <FiEdit2 color="var(--blue)" size={25} />
                </Button>
            </div>
        </StyledTask>
    );
};

export default Task;
