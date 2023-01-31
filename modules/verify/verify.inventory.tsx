export const inputStyles = ({ error }: { error?: string }) => {
  const initialValue: Partial<any> = {
    clearable: true,
    status: error ? 'error' : undefined,
    helperText: error || '',
    underlined: true,
  }

  return {
    ...initialValue,
  }
}
