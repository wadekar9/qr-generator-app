import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseTextareaInput, BaseTextInput, ThemeText } from '$components/ui'
import { whatsappQrValidator, WhatsappQrValidatorSchema } from '$validators/whatsapp-qr.validator'
import { TextInput } from 'react-native'

const WhatsappQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const messageRef = useRef<TextInput>(null);
    const { control, handleSubmit, formState: { errors } } = useForm<WhatsappQrValidatorSchema>({
        defaultValues: {
            mobile: '',
            message: '',
        },
        resolver: zodResolver(whatsappQrValidator)
    });

    const onSubmit = useCallback((values: WhatsappQrValidatorSchema) => {
        console.log('onPressSubmit', values)
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <ThemeText theme={theme}>Link a whatsapp mobile number for quick chats.</ThemeText>
            <Controller
                control={control}
                name='mobile'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Mobile Number'
                        placeholder='Enter whatsapp mobile number'
                        keyboardType={'phone-pad'}
                        returnKeyType={'next'}
                        returnKeyLabel='Next'
                        error={errors.mobile?.message}
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
                    />
                )}
            />
        </>
    )
})

export default WhatsappQRInputPage