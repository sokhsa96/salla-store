'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { Loader2 } from 'lucide-react';

import { LoginSchema, LoginFormValues } from '@/lib/schemas';
import { authService } from '@/lib/auth';
import { useAuthStore } from '@/store/useAuthStore';

import { Input } from '@/components/ui/Input';
import AuthPageWrapper from '@/components/layout/AuthPageWrapper';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // 1. Setup Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange', // Validates as you type
  });

  // 2. React Query Mutation (Handles loading/error states)
  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.user); // Persist to Zustand/LocalStorage
      router.push('/'); // Redirect to Home
    },
    onError: (err) => {
      setError('root', { 
        message: 'Invalid credentials. Try username: mor_2314, pass: 83r5^_ ' 
      });
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return (
    <AuthPageWrapper
      title="Welcome Back"
      subtitle="Enter your credentials to access your account."
      footerLink={{ text: "Don't have an account?", href: "/signup", label: "Sign Up" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Global Error Message */}
        {errors.root && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
            {errors.root.message}
          </div>
        )}

        <Input
          label="Username"
          placeholder="e.g. mor_2314"
          {...register('username')}
          error={errors.username?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
        />

        <button
          type="submit"
          disabled={!isValid || mutation.isPending}
          className="w-full flex items-center justify-center py-2.5 px-4 mt-4 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Validating...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>
    </AuthPageWrapper>
  );
}