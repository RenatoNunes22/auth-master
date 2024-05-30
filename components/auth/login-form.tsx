'use client'

import * as z from 'zod'
import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import CardWrapper from './card-wrapper'
import { login } from '@/actions/login'
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const LoginForm = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(async () => {
            await login(data, callbackUrl).then((res) => {
               if(res?.error){
                 form.reset()
                 setError(res.error)
               }

               if(res?.success){
                  form.reset()
                  setSuccess(res.success)
               }

               if(res?.twoFactor){
                  setShowTwoFactor(true)
               }
            }).catch(() => {
              setError("Something went wrong")
            })
        })
    }

    return (
        <CardWrapper
            backButtonHref="./register"
            backButtonLabel="Don't have a account?"
            showSocials={true}
            headerlabel="Welcome login form"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                    {showTwoFactor && (
                      <FormField
                          control={form.control}
                          name="code"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Two Factor Code</FormLabel>
                                  <FormControl>
                                      <Input
                                          {...field}
                                          disabled={isPending}
                                          placeholder="123456"
                                          type="text"
                                      />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                    )}
                    {!showTwoFactor && (
                      <>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john@doe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <Button size="sm" variant={'link'} asChild className='px-0 font-normal cursor-pointer'>
                                      <Link href="/auth/reset">Forgot password?</Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </>
                        )}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {showTwoFactor ? 'Verify' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm
