'use client';

import type { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { authClient } from '../auth.client';
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
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error(error);
      toast.error('Unable to login', {
        description: 'Please check your email and password',
      });

      return;
    }

    router.replace('/');
  }

  return {
    form,
    handleFieldChange,
    handleSubmit,
  };
}
