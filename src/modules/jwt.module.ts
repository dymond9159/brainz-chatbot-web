import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const jwtSecret: Secret | undefined =
    process.env.AUTH_SECRET ?? "1385324abf0674c104bdc86cc1549271";

const generateToken = (tokenData: JwtPayload, option = {}) => {
    // Generate a new JSON Web Token using the user's email and others
    try {
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined");
        }
        const token = jwt.sign(tokenData, jwtSecret, option);
        return token;
    } catch (err) {
        throw (err as Error).message;
    }
};

const decodeToken = (token: string) => {
    try {
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined");
        }
        const decoded = jwt.verify(token, jwtSecret);
        return decoded as JwtPayload;
    } catch (err) {
        throw (err as Error).message;
    }
};

const jwtModule = { generateToken, decodeToken };

export default jwtModule;
