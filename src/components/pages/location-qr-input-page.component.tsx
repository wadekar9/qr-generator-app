import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { BaseInputAccessoryView, BaseTextInput, ThemeText } from '$components/ui'
import { Controller, useForm } from 'react-hook-form'
import { locationQrValidator, LocationQrValidatorSchema } from '$validators/location-qr.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from 'react-native'
import { stackNavigationRef } from '$types/navigation.types'
import { CommonActions } from '@react-navigation/native'
import { EStackScreens } from '$constants/screen.constants'

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
        stackNavigationRef.current?.dispatch(CommonActions.navigate(EStackScreens.QR_STYLING, {
            type: 'location',
            data: JSON.stringify({
                content: values.latitude + ', ' + values.longitude,
                lat: +values.latitude,
                lon: +values.longitude,
                query: values.query
            })
        }));
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <ThemeText theme={theme}>Add your location (lat, lon) and an optional note to make a QR that opens it in Maps.</ThemeText>
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
                        keyboardType={'default'}
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
