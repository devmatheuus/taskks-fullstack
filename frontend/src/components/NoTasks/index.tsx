import image from '../../assets/dashboard.gif';
import { StyledNoContent } from './style';

const NoTasks = () => {
    return (
        <StyledNoContent>
            <div>
                <p>Ops!... não encontramos nenhuma tarefa </p>
                <img src={image} alt="No tasks here" />
            </div>
        </StyledNoContent>
    );
};

export default NoTasks;
