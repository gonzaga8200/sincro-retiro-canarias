export interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

const toasts = ref<Toast[]>([])
let _id = 0

export function useToast() {
  function show(message: string, type: Toast['type'] = 'success', duration = 3500) {
    const id = _id++
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  return { toasts, show }
}
