// Hook que acompanha o componente AI Input With Loading (Kokonut UI, MIT).
// Convertido de TypeScript para JavaScript, sem mudar a lógica. Ver docs/CREDITOS-UI.md.
import { useEffect, useRef, useCallback } from 'react';

export function useAutoResizeTextarea({ minHeight, maxHeight }) {
  // useRef: guarda a referência ao <textarea> real do navegador.
  const textareaRef = useRef(null);

  // Ajusta a altura do campo ao texto, entre minHeight e maxHeight.
  const adjustHeight = useCallback(
    (reset) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      // Encolhe primeiro para medir a altura real do conteúdo (scrollHeight).
      textarea.style.height = `${minHeight}px`;

      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  // Altura inicial.
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  // Recalcula quando a janela muda de tamanho (ex.: girar o celular).
  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}
