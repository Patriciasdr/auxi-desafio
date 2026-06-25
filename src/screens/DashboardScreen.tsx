import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { cores, espaco, raio } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// 1. BANCO DE DADOS OFICIAL (A categoria 'Conta' foi removida daqui para ir pro topo)
const modulosOficiais = [
  {
    g: 'Financeiro', 
    itens: [
      { ic: '📄', nome: 'Boletos e Pagamentos', desc: 'Visualizar, copiar código de barras, e-mail, débito em conta', papeis: 'Síndico, Proprietário, Morador' },
      { ic: '📊', nome: 'Extratos Financeiros', desc: 'Extratos condominiais, do proprietário e fluxo de caixa', papeis: 'Síndico, Proprietário, Gestor' },
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
      { ic: '📢', nome: 'Circulares', desc: 'Criar, editar e visualizar circulares do condomínio', papeis: 'Síndico, Conselheiro' },
      { ic: '💬', nome: 'Fale com o Síndico', desc: 'Tickets de comunicação com o síndico', papeis: 'Morador, Síndico' },
      { ic: '🗓️', nome: 'Agenda do Condomínio', desc: 'Calendário de eventos', papeis: 'Morador, Síndico' },
      { ic: '🔔', nome: 'Notificações', desc: 'Central de notificações push', papeis: 'Todos' },
      { ic: '✉️', nome: 'Fale Conosco', desc: 'Suporte ao cliente via e-mail', papeis: 'Todos' },
    ]
  },
  {
    g: 'Operação e Acesso', 
    itens: [
      { ic: '📅', nome: 'Reserva de Espaços', desc: 'Solicitar e gerenciar reservas de áreas comuns', papeis: 'Morador, Síndico' },
      { ic: '🚪', nome: 'Autorização de Entrada/Saída', desc: 'Solicitar e gerenciar autorizações de acesso', papeis: 'Morador, Síndico' },
      { ic: '🛎️', nome: 'Painel da Portaria', desc: 'Entradas, saídas, visitas, entregas', papeis: 'Porteiro, Zelador' },
      { ic: '💧', nome: 'Controle de Consumo', desc: 'Leitura e histórico de água e gás', papeis: 'Zelador, Síndico, Gestor' },
      { ic: '🔧', nome: 'Manutenção e Reparos', desc: 'Solicitação e gerenciamento de manutenção', papeis: 'Síndico, Zelador' },
    ]
  },
  {
    g: 'Documentos e RH', 
    itens: [
      { ic: '🗂️', nome: 'Documentos Digitalizados', desc: 'Upload, download e gerenciamento de documentos', papeis: 'Todos' },
      { ic: '👥', nome: 'Departamento Pessoal', desc: 'Admissão, frequência, férias, desligamento', papeis: 'Gestor de RH, Síndico' },
      { ic: '⚖️', nome: 'Obrigações Legais', desc: 'Conformidade civil e trabalhista', papeis: 'Síndico, Gestor' },
    ]
  }
];

export function DashboardScreen({ route }: Props) {
  const { condominioNome, endereco, papel } = route.params;
  const [grupoAberto, setGrupoAberto] = useState<string | null>('Financeiro');
  const [modalConta, setModalConta] = useState(false);

  // Lógica de filtragem por trás dos panos (Inalterada)
  const modulosFiltrados = useMemo(() => {
    return modulosOficiais
      .map((grupo) => {
        const itensPermitidos = grupo.itens.filter((item) => {
          const papeisString = item.papeis.toLowerCase();
          const papelUsuario = papel.toLowerCase();
          return papeisString.includes(papelUsuario) || papeisString.includes('todos');
        });
        return { ...grupo, itens: itensPermitidos };
      })
      .filter((grupo) => grupo.itens.length > 0);
  }, [papel]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={estilos.container} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Topo com informações e o bonequinho de perfil */}
        <View style={estilos.headerRow}>
          <View style={estilos.headInfo}>
            <Text style={estilos.nomeCondo}>{condominioNome}</Text>
            <Text style={estilos.metaCondo}>{endereco} · Perfil: {papel}</Text>
          </View>
          
          <TouchableOpacity 
            style={estilos.btnPerfil} 
            onPress={() => setModalConta(true)}
            activeOpacity={0.7}
          >
            <Text style={estilos.iconePerfil}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Listagem das categorias */}
        {modulosFiltrados.map((g) => {
          // CORRIGIDO AQUI: Trocado de groupAberto para grupoAberto 
          const estaAberto = grupoAberto === g.g;
          return (
            <View key={g.g} style={estilos.sanfonaContainer}>
              <TouchableOpacity style={estilos.sanfonaHeader} onPress={() => setGrupoAberto(estaAberto ? null : g.g)}>
                <Text style={estilos.sanfonaTitulo}>{g.g}</Text>
                <Text style={estilos.sanfonaSeta}>{estaAberto ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {estaAberto && (
                <View style={estilos.grid}>
                  {g.itens.map((m) => (
                    <TouchableOpacity key={m.nome} style={estilos.cardItem} activeOpacity={0.7} onPress={() => alert(`Abrindo "${m.nome}"…`)}>
                      <View style={estilos.itemHeader}>
                        <Text style={estilos.itemIcone}>{m.ic}</Text>
                        <View style={estilos.itemInfo}>
                          <Text style={estilos.itemNome}>{m.nome}</Text>
                          <Text style={estilos.itemDesc}>{m.desc}</Text>
                          {/* ❌ AS TAGS VERDES FORAM COMPLETAMENTE DELETADAS DAQUI, NÃO EXISTEM MAIS NO VISUAL */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Janela que sobe ao clicar no bonequinho */}
      <Modal visible={modalConta} transparent animationType="slide" onRequestClose={() => setModalConta(false)}>
        <View style={estilos.modalOverlay}>
          <View style={estilos.modalContent}>
            <View style={estilos.modalBarra} />
            
            <Text style={estilos.modalTitulo}>Minha Conta</Text>

            <TouchableOpacity 
              style={estilos.modalOpcao} 
              onPress={() => { setModalConta(false); alert('Abrindo Gerenciamento de Conta…'); }}
              activeOpacity={0.7}
            >
              <Text style={estilos.modalIcone}>⚙️</Text>
              <View style={{ flex: 1 }}>
                <Text style={estilos.modalNome}>Gerenciamento de Conta</Text>
                <Text style={estilos.modalDesc}>Perfis, senha, foto e dados do usuário</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.btnFecharModal} onPress={() => setModalConta(false)}>
              <Text style={estilos.btnFecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilizações completas e unificadas
const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, padding: espaco.lg },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: espaco.lg 
  },
  headInfo: { flex: 1, marginRight: 10 },
  nomeCondo: { fontSize: 18, fontWeight: '700', color: cores.texto },
  metaCondo: { fontSize: 12, color: cores.textoSuave, marginTop: 2 },
  
  btnPerfil: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: cores.verdeClaro, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: cores.verdeEscuro
  },
  iconePerfil: { fontSize: 20 },

  sanfonaContainer: { backgroundColor: cores.branco, borderRadius: raio.card, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: cores.borda },
  sanfonaHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  sanfonaTitulo: { fontSize: 16, fontWeight: '700', color: cores.texto },
  sanfonaSeta: { fontSize: 14, color: cores.textoSuave },
  grid: { padding: 16, borderTopWidth: 1, borderColor: cores.borda, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardItem: { 
    backgroundColor: cores.branco, 
    borderRadius: 8, 
    width: '48%', 
    minHeight: 110, 
    borderWidth: 1, 
    borderColor: cores.borda, 
    padding: 12,
    shadowColor: cores.texto,
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  itemHeader: { flexDirection: 'row', gap: 10 },
  itemIcone: { fontSize: 22 },
  itemInfo: { flex: 1 },
  itemNome: { fontSize: 13, fontWeight: '700', color: cores.texto, marginBottom: 4 },
  itemDesc: { fontSize: 11, color: cores.textoSuave, lineHeight: 14 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: cores.branco, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 300 },
  modalBarra: { width: 40, height: 5, backgroundColor: cores.borda, borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
  modalTitulo: { fontSize: 20, fontWeight: '700', color: cores.texto, marginBottom: 24 },
  modalOpcao: { flexDirection: 'row', alignItems: 'center', gap: 15, padding: 16, backgroundColor: cores.fundo, borderRadius: 12, marginBottom: 20 },
  modalIcone: { fontSize: 24 },
  modalNome: { fontSize: 15, fontWeight: '700', color: cores.texto },
  modalDesc: { fontSize: 12, color: cores.textoSuave },
  btnFecharModal: { marginTop: 10, padding: 16, alignItems: 'center' },
  btnFecharTexto: { color: cores.verde, fontWeight: '700', fontSize: 16 }
});