// cn: junta classes CSS e ignora valores vazios (false, null, '').
// Versão simples do helper usado pelos componentes shadcn/21st.dev.
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
