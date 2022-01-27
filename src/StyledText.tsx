import React from 'react'
import { FC } from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { StyledString } from './StyledString'

type Props = Readonly<{
  style: StyleProp<TextStyle>
  value: StyledString
  styleMapping?: Record<string, TextStyle>
}>

export const StyledText: FC<Props> = ({ style, value, styleMapping }) => {
  return (
    <Text style={style}>
      {value.getRanges().map((range) => {
        const rangeStyle =
          range.replacement.attribute !== undefined
            ? styleMapping?.[range.replacement.attribute]
            : undefined
        return (
          <Text style={rangeStyle} key={range.start}>
            {range.replacement.value}
          </Text>
        )
      })}
    </Text>
  )
}
