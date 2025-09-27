import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { phoneQrValidator, PhoneQrValidatorSchema } from '$validators/phone-qr.validator'
import { BaseTextInput, ThemeText } from '$components/ui'

const PhoneQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const { control, handleSubmit, formState: { errors } } = useForm<PhoneQrValidatorSchema>({
        defaultValues: {
            phone: '',
        },
        resolver: zodResolver(phoneQrValidator)
    });

    const onSubmit = useCallback((values: PhoneQrValidatorSchema) => {
        console.log('onPressSubmit', values)
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <ThemeText theme={theme}>Link a phone number for quick calls.</ThemeText>
            <Controller
                control={control}
                name='phone'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Phone'
                        placeholder='Enter phone number'
                        keyboardType={'phone-pad'}
                        returnKeyType='done'
                        returnKeyLabel='Done'
                        error={errors.phone?.message}
                    />
                )}
            />
        </>
    )
})

export default PhoneQRInputPage