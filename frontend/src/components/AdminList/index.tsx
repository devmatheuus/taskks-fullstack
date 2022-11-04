import Button from '../Button/style';
import { StyledAdminListContainer } from './style';

import AdminItemList from '../AdminItemList/index';

import { UseAuth } from '../../Providers/auth/index';
import { UseAdmin } from '../../Providers/admin';

import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const AdminList = () => {
    const { token } = UseAuth();

    const { allDatasTask, next, prev, loadTasksDatas, currentPage } =
        UseAdmin();

    useEffect(() => {
        loadTasksDatas(token);
    }, [currentPage]);

    const tasksInfos = allDatasTask.tasks;
    const totalPages = Math.ceil(tasksInfos?.total / 3);

    return (
        <StyledAdminListContainer>
            <div className="container">
                <div className="container-info-page">
                    <p>
                        Página: {tasksInfos?.page} de {totalPages}
                    </p>
                </div>

                <div className="container-buttons-filer">
                    <Button onClick={() => loadTasksDatas(token, true)}>
                        Tarefas atrasadas
                    </Button>

                    <Button onClick={() => loadTasksDatas(token, false)}>
                        Todas as tarefas
                    </Button>
                </div>

                <ul className="container-infos">
                    {tasksInfos?.tasks.length > 0 &&
                        tasksInfos.tasks.map(task => (
                            <AdminItemList task={task} key={uuid()} />
                        ))}
                </ul>
            </div>

            <div className="container-buttons">
                <Button
                    disabled={tasksInfos?.previous === null}
                    style={{
                        cursor: tasksInfos?.previous ? 'pointer' : 'not-allowed'
                    }}
                    onClick={prev}
                >
                    Anterior
                </Button>

                <Button
                    disabled={tasksInfos?.next === null}
                    style={{
                        cursor: tasksInfos?.next ? 'pointer' : 'not-allowed'
                    }}
                    onClick={next}
                >
                    Próxima
                </Button>
            </div>
        </StyledAdminListContainer>
    );
};

export default AdminList;
