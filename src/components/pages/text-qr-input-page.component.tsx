import { StyleSheet, TextInput } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { BaseQRInputPageProps, BaseQRInputPageRef } from '$types/common.types'
import { BaseInputAccessoryView, BaseTextareaInput } from '$components/ui'
import { useState } from 'react'

const TextQRInputPage = forwardRef<BaseQRInputPageRef, BaseQRInputPageProps>(({ theme }, ref) => {

    const [text, setText] = useState<string>('');

    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
        onPressSubmit: () => {
            console.log('onPressSubmit', text)
        }
    }), [text])

    return (
        <>
            <BaseTextareaInput
                ref={inputRef}
                value={text}
                onChangeText={setText}
                label='Add message'
                placeholder='Type message here...'
                inputAccessoryViewID='plain-text-description-id'
                keyboardType={'default'}
            />

            <BaseInputAccessoryView
                theme={theme}
                inputAccessoryViewID='plain-text-description-id'
                onDone={() => inputRef.current?.blur()}
            />
        </>
    )
})

export default TextQRInputPage

const styles = StyleSheet.create({})