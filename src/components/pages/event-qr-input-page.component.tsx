import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { BaseDatePicker, BaseTextInput } from '$components/ui'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from 'react-native'
import { EventQrValidatorSchema, eventQrValidator } from '$validators/event-qr.validator'
import { stackNavigationRef } from '$types/navigation.types'
import { CommonActions } from '@react-navigation/native'
import { EStackScreens } from '$constants/screen.constants'

const EventQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const organizorRef = useRef<TextInput>(null);
    const { control, handleSubmit, formState: { errors } } = useForm<EventQrValidatorSchema>({
        defaultValues: {
            title: '',
            organizor: '',
            startDateTime: new Date(),
            endDateTime: new Date()
        },
        resolver: zodResolver(eventQrValidator)
    });

    const onSubmit = useCallback((values: EventQrValidatorSchema) => {
        stackNavigationRef.current?.dispatch(CommonActions.navigate(EStackScreens.QR_STYLING, {
            type: 'event',
            data: JSON.stringify({
                organizer: values.organizor,
                start: values.startDateTime,
                end: values.endDateTime,
                summary: values.title,
            })
        }));
    }, [])

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => handleSubmit(onSubmit)()
    }), [handleSubmit, onSubmit])

    return (
        <>
            <Controller
                control={control}
                name='title'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Event Name'
                        placeholder='Enter event name'
                        returnKeyType='next'
                        returnKeyLabel='Next'
                        autoCapitalize='none'
                        onSubmitEditing={() => organizorRef.current?.focus()}
                        error={errors.title?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='organizor'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseTextInput
                        ref={organizorRef}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        label='Organizor'
                        placeholder='Enter the organizor'
                        returnKeyType='done'
                        returnKeyLabel='Done'
                        error={errors.organizor?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='startDateTime'
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseDatePicker
                        value={value}
                        onDateChange={onChange}
                        label='Start Date & Time'
                        placeholder='Enter start date & time'
                        error={errors.startDateTime?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name={'endDateTime'}
                render={({ field: { value, onChange, onBlur } }) => (
                    <BaseDatePicker
                        value={value}
                        onDateChange={onChange}
                        label='End Date & Time'
                        placeholder='Enter end date & time'
                        error={errors.endDateTime?.message}
                    />
                )}
            />
        </>
    )
})

export default EventQRInputPage
