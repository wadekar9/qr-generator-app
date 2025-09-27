import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseInputAccessoryView, BaseTextareaInput, BaseTextInput, ThemeText } from '$components/ui'
import { smsQrValidator, SMSQrValidatorSchema } from '$validators/sms-qr.validator'
import { TextInput } from 'react-native'

const SMSQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const messageRef = useRef<TextInput>(null)
    const { control, handleSubmit, formState: { errors } } = useForm<SMSQrValidatorSchema>({
        defaultValues: {
            phone: '',
            message: '',
        },
        resolver: zodResolver(smsQrValidator)
    });

    const onSubmit = useCallback((values: SMSQrValidatorSchema) => {
        console.log('onPressSubmit', values)
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <ThemeText theme={theme}>Link phone number to send a text message quicker.</ThemeText>
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
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        error={errors.phone?.message}
                        onSubmitEditing={() => messageRef.current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='message'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextareaInput
                        ref={messageRef}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Add message'
                        placeholder='Type message here...'
                        inputAccessoryViewID='plain-text-description-id'
                        keyboardType={'default'}
                        error={errors.message?.message}
                        onSubmitEditing={() => messageRef.current?.blur()}
                    />
                )}
            />

            <BaseInputAccessoryView
                theme={theme}
                inputAccessoryViewID='plain-text-description-id'
                onDone={() => messageRef.current?.blur()}
            />
        </>
    )
})

export default SMSQRInputPage