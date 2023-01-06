export const inputStylesLanguage = ({ error }: { error?: string }) => {
  const initialValue: Partial<any> = {
    status: error ? 'error' : 'default',
    helperText: error || '',
    underlined: true,
  }

  return {
    ...initialValue,
  }
}
