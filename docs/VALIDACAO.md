# Validação da base SUAP — 13/11/2026

- Instalação e compilação concluídas; auditoria sem vulnerabilidades.
- Três botões conferidos na demonstração: disciplinas, notas/faltas e horários retornam JSON local fictício.
- Interface conferida no celular (375 × 844), sem sobreposição de controles.
- Modo normal sem configuração recusa a consulta com mensagem explícita, sem fingir conexão.
- Integração real SUAP NÃO testada: endereços vazios, autorização e CORS desconhecidos.

Demonstração é consulta GET de JSON fictício local; não comprova API institucional.
Esta branch é uma base de desenvolvimento, não uma entrega com integração SUAP concluída.
Nenhuma submissão foi realizada.
