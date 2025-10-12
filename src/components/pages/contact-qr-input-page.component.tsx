import React, { createRef, forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseDropdown, BaseTextInput, ThemeText } from '$components/ui'
import { contactQrValidator, ContactQrValidatorSchema } from '$validators/contact-qr.validator'
import { TextInput } from 'react-native'
import countryList from 'react-select-country-list'
import { NAME_PREFIXES } from '$constants/app.constants'
import { stackNavigationRef } from '$types/navigation.types'
import { CommonActions } from '@react-navigation/native'
import { EStackScreens } from '$constants/screen.constants'

const ContactQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const countries = useMemo(() => countryList().getData(), [])
    const inputRefs = useRef(Array.from({ length: 10 }).map(() => createRef<TextInput>())).current;
    const { control, handleSubmit, formState: { errors } } = useForm<ContactQrValidatorSchema>({
        defaultValues: {
            firstName: '',
            lastName: '',
            prefix: '',
            organization: '',
            phone: '',
            email: '',
            website: '',
            street: '',
            city: '',
            region: '',
            postcode: '',
            country: '',
            note: '',
        },
        resolver: zodResolver(contactQrValidator)
    });

    const onSubmit = useCallback((values: ContactQrValidatorSchema) => {
        stackNavigationRef.current?.dispatch(CommonActions.navigate(EStackScreens.QR_STYLING, {
            type: 'contact',
            data: JSON.stringify({
                name: values.firstName + ' ' + values.lastName,
                company: values.organization,
                title: values.prefix,
                phoneNumber: values.phone,
                email: values.email,
                address: values.street + ', ' + values.city + ', ' + values.region + ', ' + values.postcode + ', ' + values.country,
                website: values.website,
                note: values.note,
            })
        }));
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <ThemeText theme={theme}>Create & Share contact details easily.</ThemeText>

            <Controller
                control={control}
                name='firstName'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='First Name'
                        placeholder='Enter a first name'
                        keyboardType={'default'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        error={errors.firstName?.message}
                        onSubmitEditing={() => inputRefs[0].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='lastName'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[0]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Last Name'
                        placeholder='Enter a last name'
                        keyboardType={'default'}
                        returnKeyType='done'
                        returnKeyLabel='Done'
                        error={errors.lastName?.message}
                        onSubmitEditing={() => inputRefs[1].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='prefix'
                render={({ field: { value, onChange } }) => (
                    <BaseDropdown
                        data={NAME_PREFIXES}
                        value={value}
                        onValueChange={onChange}
                        label='Prefix'
                        placeholder='Select a prefix'
                        error={errors.prefix?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name='organization'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[1]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Organization'
                        placeholder='Enter an organization'
                        keyboardType={'default'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        error={errors.organization?.message}
                        onSubmitEditing={() => inputRefs[2].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='email'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[2]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Email'
                        placeholder='Enter an email address'
                        keyboardType={'email-address'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        error={errors.email?.message}
                        onSubmitEditing={() => inputRefs[3].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='phone'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[3]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Phone'
                        placeholder='Enter a phone number'
                        keyboardType={'phone-pad'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        error={errors.phone?.message}
                        onSubmitEditing={() => inputRefs[4].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='street'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[4]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Street'
                        placeholder='Enter a street'
                        keyboardType={'default'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        error={errors.street?.message}
                        onSubmitEditing={() => inputRefs[5].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='city'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[5]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='City'
                        placeholder='Enter a city'
                        keyboardType={'default'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        error={errors.city?.message}
                        onSubmitEditing={() => inputRefs[6].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='region'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[6]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Region'
                        placeholder='Enter a region'
                        keyboardType={'default'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        error={errors.region?.message}
                        onSubmitEditing={() => inputRefs[7].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='postcode'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[7]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Postcode'
                        placeholder='Enter a postcode'
                        keyboardType={'default'}
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        autoCapitalize={'characters'}
                        error={errors.postcode?.message}
                        onSubmitEditing={() => inputRefs[8].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='country'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseDropdown
                        data={countries}
                        value={value}
                        onValueChange={onChange}
                        label='Country'
                        placeholder='Select a country'
                        error={errors.country?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name='website'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[8]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Website/Social URL'
                        placeholder='Enter website/social url'
                        keyboardType={'url'}
                        returnKeyType='done'
                        returnKeyLabel='Done'
                        error={errors.website?.message}
                        onSubmitEditing={() => inputRefs[9].current?.focus()}
                    />
                )}
            />

            <Controller
                control={control}
                name='note'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={inputRefs[9]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Note'
                        placeholder='Enter note'
                        keyboardType={'default'}
                        returnKeyType='done'
                        returnKeyLabel='Done'
                        error={errors.note?.message}
                    />
                )}
            />
        </>
    )
})

export default ContactQRInputPage