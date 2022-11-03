import { toast } from 'react-toastify';

const verifyDeadlineIsValid = (deadline: string) => {
    const today = new Date().getTime();

    const deadlineFormate = deadline.split('/');

    const day = deadlineFormate[0];
    const month = deadlineFormate[1];
    const year = deadlineFormate[2];

    const timeTaskDeadline = new Date(+year, +month - 1, +day).getTime();

    if (timeTaskDeadline < today) {
        toast.error('Prazo inválido');

        return false;
    }

    return true;
};
export default verifyDeadlineIsValid;
