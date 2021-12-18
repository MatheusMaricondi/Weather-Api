import messages_pt from './pt.json'
import messages_en from './en.json'

type Messages = {
    [key: string]: string
}
type Message = { [key: string]: Messages }

// export const messages = {
//     messages_pt,
//     messages_en
// }

export const messagesMap = {
    'en-US': messages_en,
    'pt-BR': messages_pt
} as Message