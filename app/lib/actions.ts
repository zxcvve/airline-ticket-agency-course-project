'use server';

import {signIn} from '@/auth';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials',
      // {
      //   redirectTo: "/"
      // }
      Object.fromEntries(formData)
    )
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}