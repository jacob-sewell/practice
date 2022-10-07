# Email Masker

(From 2022-07-17 edition of cassidoo.email)

## Description

Given a string that has a valid email address, write a function to hide the first part of the email (before the `@` sign), minus the first and last character. For extra credit, add a flag to hide the second part after the `@` sign to your function excluding the first character and the domain extension.

## Examples

```js
hideEmail('example@example.com')
'e*****e@example.com'

hideEmail('example+test@example.co.uk', hideFull)
'e**********t@e******.co.uk'
``
