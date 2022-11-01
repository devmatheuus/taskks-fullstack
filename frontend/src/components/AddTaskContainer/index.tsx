import Button from '../Button/style';
import { Container } from './style';

const AddTaskContainer = () => {
    return (
        <Container>
            <div>
                <h3>Tarefas</h3>
                <Button>+</Button>
            </div>
        </Container>
    );
};

export default AddTaskContainer;
