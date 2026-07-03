import { useState, useMemo } from 'react';

export interface ItemModulo {
  ic: string;
  nome: string;
  desc: string;
  papeis: string;
}

export interface GrupoModulo {
  g: string;
  itens: ItemModulo[];
}

const modulosOficiais: GrupoModulo[] = [
  {
    g: 'Financeiro', 
    itens: [
      { ic: '📄', nome: 'Boletos e Pagamentos', desc: 'Visualizar, copiar código de barras e débito', papeis: 'Síndico, Proprietário, Morador' },
      { ic: '📊', nome: 'Extratos Financeiros', desc: 'Extratos condominiais e fluxo de caixa', papeis: 'Síndico, Proprietário, Gestor' },
      { ic: '⏳', nome: 'Cotas Pendentes', desc: 'Consulta de cotas em aberto por unidade', papeis: 'Síndico, Gestor, Morador' },
      { ic: '💰', nome: 'Saldo', desc: 'Visualização de saldo financeiro', papeis: 'Síndico, Proprietário, Gestor' },
      { ic: '🧾', nome: 'Notas Fiscais', desc: 'Consulta de notas de aluguéis', papeis: 'Gerente, Proprietário' },
      { ic: '📋', nome: 'Informe de Rendimentos', desc: 'Comprovante de rendimentos para IR', papeis: 'Síndico, Proprietário' },
      { ic: '💸', nome: 'Gestão de Gastos', desc: 'Adiantamentos, reembolsos e aprovações', papeis: 'Síndico, Gestor' },
    ]
  },
  {
    g: 'Imóveis', 
    itens: [
      { ic: '🏠', nome: 'Meus Imóveis', desc: 'Situação financeira de imóveis por período', papeis: 'Proprietário' },
      { ic: '🔍', nome: 'Pesquisa de Aluguéis', desc: 'Análise de valores de aluguel no mercado', papeis: 'Gerente, Proprietário' },
    ]
  },
  {
    g: 'Comunicação', 
    itens: [
      { ic: '📢', nome: 'Circulares', desc: 'Criar, editar e visualizar circulares', papeis: 'Síndico, Conselheiro' },
      { ic: '💬', nome: 'Fale com o Síndico', desc: 'Tickets de comunicação com o síndico', papeis: 'Morador, Síndico' },
      { ic: '🗓️', nome: 'Agenda do Condomínio', desc: 'Calendário de eventos', papeis: 'Morador, Síndico' },
      { ic: '🔔', nome: 'Notificações', desc: 'Central de notificações push', papeis: 'Todos' },
      { ic: '✉️', nome: 'Fale Conosco', desc: 'Suporte ao cliente via e-mail', papeis: 'Todos' },
    ]
  },
  {
    g: 'Operação e Acesso', 
    itens: [
      { ic: '📅', nome: 'Reserva de Espaços', desc: 'Solicitar e gerenciar áreas comuns', papeis: 'Morador, Síndico' },
      { ic: '🚪', nome: 'Autorização de Acesso', desc: 'Gerenciar autorizações de entrada/saída', papeis: 'Morador, Síndico' },
      { ic: '🛎️', nome: 'Painel da Portaria', desc: 'Entradas, saídas, visitas e entregas', papeis: 'Porteiro, Zelador' },
      { ic: '💧', nome: 'Controle de Consumo', desc: 'Leitura e histórico de água e gás', papeis: 'Zelador, Síndico, Gestor' },
      { ic: '🔧', nome: 'Manutenção e Reparos', desc: 'Solicitação e gerenciamento de reparos', papeis: 'Síndico, Zelador' },
    ]
  },
  {
    g: 'Documentos e RH', 
    itens: [
      { ic: '🗂️', nome: 'Documentos', desc: 'Upload, download e arquivos digitais', papeis: 'Todos' },
      { ic: '👥', nome: 'Departamento Pessoal', desc: 'Admissão, frequência, férias e equipe', papeis: 'Gestor de RH, Síndico' },
      { ic: '⚖️', nome: 'Obrigações Legais', desc: 'Conformidade civil e trabalhista', papeis: 'Síndico, Gestor' },
    ]
  },
  {
    g: 'Conta', 
    itens: [
      { ic: '👤', nome: 'Meu Gerente de Contas', desc: 'Informações de contato do gerente responsável', papeis: 'Proprietário, Gerente' },
    ]
  }
];

interface UseDashboardProps {
  papel: string;
}

export function useDashboard({ papel }: UseDashboardProps) {
  const [grupoAberto, setGrupoAberto] = useState<string | null>('Financeiro');

  const modulosFiltrados = useMemo(() => {
    return modulosOficiais
      .map((grupo: GrupoModulo) => {
        const itensPermitidos = grupo.itens.filter((item: ItemModulo) => {
          const papeisString = item.papeis.toLowerCase();
          const papelUsuario = papel.toLowerCase();
          return papeisString.includes(papelUsuario) || papeisString.includes('todos');
        });
        return { ...grupo, itens: itensPermitidos };
      })
      .filter((grupo) => grupo.itens.length > 0);
  }, [papel]);

  function alternarGrupo(grupoNome: string) {
    setGrupoAberto((atual) => (atual === grupoNome ? null : grupoNome));
  }

  return {
    modulosFiltrados,
    grupoAberto,
    alternarGrupo
  };
}