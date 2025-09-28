import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { BaseInputAccessoryView, BaseTextInput, ThemeText } from '$components/ui'
import { Controller, useForm } from 'react-hook-form'
import { locationQrValidator, LocationQrValidatorSchema } from '$validators/location-qr.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from 'react-native'

const LocationQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const [queryRef, longitudeRef] = useRef(Array.from({ length: 2 }).map(() => React.createRef<TextInput>())).current;
    const { control, handleSubmit, formState: { errors } } = useForm<LocationQrValidatorSchema>({
        defaultValues: {
            latitude: '',
            longitude: '',
            query: ''
        },
        resolver: zodResolver(locationQrValidator)
    });

    const onSubmit = useCallback((values: LocationQrValidatorSchema) => {
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
                name='latitude'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Latitude'
                        placeholder='Enter latitude'
                        keyboardType={'decimal-pad'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        autoCapitalize='none'
                        onSubmitEditing={() => longitudeRef.current?.focus()}
                        error={errors.latitude?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='longitude'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={longitudeRef}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Longitude'
                        placeholder='Enter longitude'
                        keyboardType={'decimal-pad'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        onSubmitEditing={() => queryRef.current?.focus()}
                        error={errors.longitude?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='query'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={queryRef}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Query'
                        placeholder='Enter query'
                        keyboardType={'decimal-pad'}
                        error={errors.query?.message}
                        inputAccessoryViewID='location-query'
                    />
                )}
            />

            <BaseInputAccessoryView theme={theme} inputAccessoryViewID='location-query' />
        </>
    )
})

export default LocationQRInputPage
