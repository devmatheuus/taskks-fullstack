const getDateInNumber = (date: string) => {
    const formateDeadline = date.split('/');

    const day = formateDeadline[0];
    const month = formateDeadline[1];
    const year = formateDeadline[2];

    const dateInNumber = new Date(+year, +month - 1, +day).getTime();

    return dateInNumber;
};

export default getDateInNumber;
