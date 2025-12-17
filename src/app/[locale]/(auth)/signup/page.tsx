'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { Loader2 } from 'lucide-react';

import { SignupSchema, SignupFormValues } from '@/lib/schemas';
import { authService } from '@/lib/auth';
import { Input } from '@/components/ui/Input';
import AuthPageWrapper from '@/components/layout/AuthPageWrapper';

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      // In a real app, you might ask them to verify email
      // Here we just redirect to login
      router.push('/login');
    },
  });

  return (
    <AuthPageWrapper
      title="Create Account"
      subtitle="Join us today and start your journey."
      footerLink={{ text: "Already have an account?", href: "/login", label: "Log In" }}
    >
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-3">
        
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Username"
          placeholder="Choose a username"
          {...register('username')}
          error={errors.username?.message}
        />

        <div className="flex gap-3">
          <Input
            label="First Name"
            placeholder="John"
            {...register('firstname')}
            error={errors.firstname?.message}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            {...register('lastname')}
            error={errors.lastname?.message}
          />
        </div>

        <div className="flex gap-3">
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Input
            label="Confirm"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || mutation.isPending}
          className="w-full flex items-center justify-center py-2.5 px-4 mt-6 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </AuthPageWrapper>
  );
}