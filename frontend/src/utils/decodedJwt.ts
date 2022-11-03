import jwt from 'jsonwebtoken';
import 'dotenv/config';

const decodeToken = (token: string) => {
    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
        console.log(decoded);
    });
};

export default decodeToken;
