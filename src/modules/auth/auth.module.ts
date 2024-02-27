import { UserCreateParams } from "@/types";
import prisma from "../prisma";
import bcryptjs from "bcryptjs";

// Function to generate a hashed password
export const generatePasswordHash = async (password: string) => {
    // generates a random salt. A salt is a random value used in the hashing process to ensure
    // that even if two users have the same password, their hashed passwords will be different.
    // The 10 in the function call represents the cost factor, which determines how much
    // computational work is needed to compute the hash.
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
};

export const compare = async (hash: string, s: string) => {
    return await bcryptjs.compare(s, hash);
};

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
    } catch (err) {
        throw err;
    }
};

export const isNewUser = async (email: string) => {
    try {
        const user = await getUserByEmail(email);
        return !user;
    } catch (err) {
        return false;
    }
};

export const creatUser = async (userData: UserCreateParams) => {
    if (!userData.email || !userData.password || !userData.name) return null;

    const hashed = await generatePasswordHash(userData.password);
    try {
        const user = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                emailVerified: userData.emailVerified,
                password: hashed,
                firstname: userData.firstname,
                lastname: userData.lastname,
                birthdate: userData.birthdate,
                phone: userData.phone,
                locale: userData.locale,
                address: userData.address,
                image: userData.image,
                visits: 1,
            },
        });
        return user;
    } catch (err) {
        throw err;
    }
};
