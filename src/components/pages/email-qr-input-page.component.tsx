import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { BaseInputAccessoryView, BaseTextareaInput, BaseTextInput, ThemeText } from '$components/ui'
import { Controller, useForm } from 'react-hook-form'
import { emailQrValidator, EmailQrValidatorSchema } from 'src/validators/email-qr.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from 'react-native'

const EmailQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const [subjectRef, messageRef] = useRef(Array.from({ length: 2 }).map(() => React.createRef<TextInput>())).current;
    const { control, handleSubmit, formState: { errors } } = useForm<EmailQrValidatorSchema>({
        defaultValues: {
            email: '',
            subject: '',
            message: ''
        },
        resolver: zodResolver(emailQrValidator)
    });

    const onSubmit = useCallback((values: EmailQrValidatorSchema) => {
        console.log('onPressSubmit', values)
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <ThemeText theme={theme}>Link an email address to open the email app ready to go.</ThemeText>
            <Controller
                control={control}
                name='email'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Email'
                        placeholder='Enter email address'
                        keyboardType={'email-address'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        autoCapitalize='none'
                        onSubmitEditing={() => subjectRef.current?.focus()}
                        error={errors.email?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='subject'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={subjectRef}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Subject'
                        placeholder='Enter a subject'
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        onSubmitEditing={() => messageRef.current?.focus()}
                        error={errors.subject?.message}
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

            <BaseInputAccessoryView
                theme={theme}
                inputAccessoryViewID='plain-text-description-id'
                onDone={() => messageRef.current?.blur()}
            />
        </>
    )
})

export default EmailQRInputPage