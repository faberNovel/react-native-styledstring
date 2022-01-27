# React Native StyledString

## Installation

```sh
yarn add react-native-styledstring
```

## Usage

You can create a styled string like this: 

```ts
const styledString = new StyledString('This is a {{arg1}} and {{arg2}} sentence!', {
  arg1: {
    attribute: 'highlighted',
    value: 'localized',
  },
  arg2: {
    attribute: 'underline',
    value: 'styled',
  },
})
```

The attributes can take any value you like. It's up to you to provide styles for these custom attributes.

To display a `StyledString` use the `StyledText` component: 

```ts
<StyledText
  style={styles.text}
  value={styledString}
  styleMapping={{
    highlighted: styles.textHighlighted,
    underline: styles.textUnderline,
  }}
/>

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  textHighlighted: {
    color: 'blue',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
})
```

The result looks like this:

<img src="https://user-images.githubusercontent.com/1964177/151387244-aac7be52-2b9e-43cd-816f-2609e1fd09dc.png" width=300 />

## i18n

The main goal of the library is to be used with localized string.

For instance with the following translations:

```json
{
 "styled_format": "This is a {{arg1}} and {{arg2}} sentence!",
 "styled_format_arg1": "localized",
 "styled_format_arg2": "styled",
}
```

we would create a localized and styled string like so:

```ts
const styledString = new StyledString(i18n.t('styled_format'), {
  arg1: {
    attribute: 'highlighted',
    value: i18n.t('styled_format_arg1'),
  },
  arg2: {
    attribute: 'underline',
    value: i18n.t('styled_format_arg2'),
  },
})
```
