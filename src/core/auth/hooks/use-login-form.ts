'use client';

import type { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { loginSchema } from '../auth.schema';

export function useLoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleFieldChange(
    field: { onChange: (value: string) => void },
    fieldName: keyof z.infer<typeof loginSchema>,
  ) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      field.onChange(e.target.value);
      form.clearErrors(fieldName);
    };
  }

  async function handleSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error === 'CredentialsSignin') {
        toast.error('Unable to login', {
          description: 'Please check your email and password',
        });

        return;
      }

      if (response?.error) {
        throw new Error(response.error);
      }

      router.replace('/');
    } catch (e) {
      toast.error('Unable to login', {
        description: 'Please try again later',
      });

      console.error(e);
    }
  }

  return {
    form,
    handleFieldChange,
    handleSubmit,
  };
}
