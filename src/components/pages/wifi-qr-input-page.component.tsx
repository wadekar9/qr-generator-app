import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { BaseCheckbox, BaseDropdown, BaseLabelCheckbox, BaseSwitch, BaseTextInput, ThemeText } from '$components/ui'
import { Controller, useForm } from 'react-hook-form'
import { wifiQrValidator, WifiQrValidatorSchema } from '$validators/wifi-qr.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput, View } from 'react-native'
import { WIFI_TYPES } from '$constants/app.constants'
import { stackNavigationRef } from '$types/navigation.types'
import { CommonActions } from '@react-navigation/native'
import { EStackScreens } from '$constants/screen.constants'

const WifiQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const passwordRef = useRef<TextInput>(null);
    const { control, handleSubmit, formState: { errors } } = useForm<WifiQrValidatorSchema>({
        defaultValues: {
            network: '',
            password: '',
            hidden: false,
            encryption: 'NONE'
        },
        resolver: zodResolver(wifiQrValidator)
    });

    const onSubmit = useCallback((values: WifiQrValidatorSchema) => {
        stackNavigationRef.current?.dispatch(CommonActions.navigate(EStackScreens.QR_STYLING, {
            type: 'wifi',
            data: JSON.stringify({
                content: values.network,
                ssid: values.network,
                psk: values.password,
                hidden: values.hidden,
                authentication: values.encryption
            })
        }));
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <ThemeText theme={theme}>Link an email address to open the email app ready to go.</ThemeText>
            <Controller
                control={control}
                name='network'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Network'
                        placeholder='Enter network name(SSID)'
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        autoCapitalize='none'
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        error={errors.network?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name='password'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={passwordRef}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={true}
                        label='Password'
                        placeholder='Enter a password'
                        returnKeyType='done'
                        returnKeyLabel='Done'
                        error={errors.password?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name='encryption'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseDropdown
                        data={WIFI_TYPES}
                        onValueChange={onChange}
                        value={value}
                        label='Encryption'
                        placeholder='Select encryption type'
                        error={errors.encryption?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name='hidden'
                render={({ field: { value, onChange } }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ThemeText theme={theme}>Hidden Network</ThemeText>
                        <BaseSwitch
                            value={value}
                            onValueChange={onChange}
                        />
                    </View>
                )}
            />
        </>
    )
})

export default WifiQRInputPage