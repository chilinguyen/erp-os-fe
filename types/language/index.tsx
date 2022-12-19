export interface DictionaryKey {
  [key: string]: string
}

export interface LanguageResponseSuccess {
  id: string
  language: string
  key: string
  dictionary: DictionaryKey
}

export interface LanguageRequest {
  language: string
  key: string
  dictionary: DictionaryKey
}

export interface AddNewLanguageRequest {
  language: string
  key: string
}

export type UpdateDictionaryListRequest = { id: string; dictionary: DictionaryKey }[]
