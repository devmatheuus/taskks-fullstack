export interface jwtPayload {
    is_admin: boolean;
    iat: number;
    exp: number;
    sub: string;
}
