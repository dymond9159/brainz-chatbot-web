'use client';

import routes from '@/utils/routes';
import authModule from '@/modules/auth';
import { UserCreateParams } from '@/types';
import jwtModule from '@/modules/jwt.module';
import { signIn, signOut } from 'next-auth/react';

export const signinWithProvider = async (
  provider: string,
  redirectTo?: string
) => {
  await signIn(provider, {
    redirectTo: redirectTo ?? routes.CHAT,
  });
};

export const signinWithEmail = async (
  userData: UserCreateParams,
  redirectTo?: string
) => {
  // email verify
  // make sure the user does not enter a registered email
  const email = userData.email;
  if (email === '') {
    return 'Your email is invalid.';
  }
  const isEmailExists = await authModule.getUserByEmail(email);

  if (!isEmailExists) {
    return 'Your email is invalid.';
  }
  //
  const formData = new FormData();
  formData.append('email', userData.email);
  formData.append('password', userData.password ?? '');
  formData.append('redirectTo', redirectTo ?? routes.CHAT);
  await signIn('credentials', userData);
};

export const sendTokenWithEmail = async (email: string) => {
  // veryfy the email
  const token = jwtModule.generateToken({ email }, { expiresIn: '30min' });

  // http://localhost:3000/email/verify?email=${email}&token=${token}
  const verifyUrl = `${process.env.NEXT_PUBLIC_API_URL}${routes.VERIFY}?email=${email}&token=${token}`;
  console.log(verifyUrl);
  // Sending email verification
  // `/email/verify/send?email=${email}&verification_sent=1`;
  // await mailModule.sendVerificationEmail(result.data.email, verificationToken);
  const nextPage = `${routes.SEND}?email=${email}&verification_sent=1`;
  return nextPage;
};

export const signupWithEmail = async (userData: UserCreateParams) => {
  try {
    // check existing the email.
    const email = userData.email;
    const isEmailExists = await authModule.getUserByEmail(email);

    if (!isEmailExists) {
      return sendTokenWithEmail(email);
    } else {
      return 'Email already exists.';
    }
  } catch (err) {
    throw err;
  }
};

export const verifyToken = async (email: string, token: string) => {
  try {
    const decoded = await jwtModule.decodeToken(token);
    return decoded?.email === email;
  } catch (err) {
    throw err;
  }
};

export const register = async (userData: UserCreateParams) => {
  try {
    const isEmailExists = await authModule.getUserByEmail(userData.email);

    if (!isEmailExists) {
      const response = await authModule.createUser(userData);
      return response;
    } else {
      return userData;
    }
  } catch (err) {
    throw err;
  }
};

export const signout = async () => {
  await signOut();
};
