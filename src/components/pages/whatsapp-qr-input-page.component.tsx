import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseTextareaInput, BaseTextInput, ThemeText } from '$components/ui'
import { whatsappQrValidator, WhatsappQrValidatorSchema } from '$validators/whatsapp-qr.validator'
import { TextInput } from 'react-native'
import { stackNavigationRef } from '$types/navigation.types'
import { CommonActions } from '@react-navigation/native'
import { EStackScreens } from '$constants/screen.constants'
import { generateQRCode } from '$native/QRGenerator'
import { whatsAppBase64 } from '$constants/content.constants'
import { useHistory } from '$hooks/module'

const WhatsappQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const { addQRCode } = useHistory();
    const messageRef = useRef<TextInput>(null);
    const { control, handleSubmit, formState: { errors } } = useForm<WhatsappQrValidatorSchema>({
        defaultValues: {
            mobile: '',
            message: '',
        },
        resolver: zodResolver(whatsappQrValidator)
    });

    const onSubmit = useCallback(async (values: WhatsappQrValidatorSchema) => {

        const qrImage = await generateQRCode({
            value: `https://wa.me/${values.mobile}?text=${values.message}`,
            type: 'Url'
        }, {
            padding: 0.05,
            errorCorrectionLevel: 'High',
            logo: {
                base64: whatsAppBase64,
                size: 0.3,
                padding: 0.0,
                shape: 'Square',
            },
            background: { color: '#ffffff' },
            colors: {
                dark: {
                    type: 'Solid',
                    color: '#25D366'
                }
            },
            shapes: {
                darkPixel: {
                    type: 'Circle'
                },
                ball: {
                    type: 'Default'
                },
                frame: {
                    type: 'Default'
                },
            }
        });
        addQRCode({
            type: 'whatsapp',
            content: values.mobile,
            data: JSON.stringify({
                value: `https://wa.me/${values.mobile}?text=${values.message}`,
                type: 'Url'
            }),
            base64: qrImage,
            timestamp: Date.now()
        })
        stackNavigationRef.current?.dispatch(CommonActions.navigate(EStackScreens.QR_RESULT, { base64: qrImage }))
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