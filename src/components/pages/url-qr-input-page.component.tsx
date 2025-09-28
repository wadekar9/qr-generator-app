import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { BaseTextInput, ThemeText } from '$components/ui'
import { Controller, useForm } from 'react-hook-form'
import { webQrValidator, WebQrValidatorSchema } from '$validators/web-qr.validator'
import { zodResolver } from '@hookform/resolvers/zod'

const URLQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const { control, handleSubmit, formState: { errors } } = useForm<WebQrValidatorSchema>({
        defaultValues: {
            url: ''
        },
        resolver: zodResolver(webQrValidator)
    });

    const onSubmit = useCallback((values: WebQrValidatorSchema) => {
        console.log('onPressSubmit', values)
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <ThemeText theme={theme}>Redirect to an existing web URL.</ThemeText>
            <Controller
                control={control}
                name='url'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder='Enter URL here'
                        keyboardType={'url'}
                        returnKeyType='done'
                        returnKeyLabel='Done'
                        autoCapitalize='none'
                        error={errors.url?.message}
                    />
                )}
            />
            <ThemeText theme={theme} variant={'body5'}>Try something like https://example.com/</ThemeText>
        </>
    )
})

export default URLQRInputPage