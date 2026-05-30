import { useState, useEffect } from 'react';

// Link fictício do Google Drive para o manual unificado
const MANUAL_DRIVE_URL = "https://drive.google.com/file/d/YOUR_MANUAL_ID/view";
const QR_CODE_API = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(MANUAL_DRIVE_URL)}`;

// ============================================================================
// BANCO DE COMPONENTES DOS 18 MÓDULOS (COMPLEMENTE ÀS CEGAS PARA O OPERADOR)
// ============================================================================

// Módulo 1: Alarme Primário (DSS05)
function Modulo01({ onSolved, onStrike }) {
  const [selected, setSelected] = useState('');
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE SEGURANÇA [ATIVO]</div>
      <p style={{ ...styles.moduleDesc, color: '#ff0055', animation: 'blink 1s infinite' }}>⚠️ ALERTA INTERNO: COMPORTAMENTO ANÔMALO DE DADOS</p>
      <div style={styles.radioGroup}>
        {['Isolar Servidor', 'Aplicar Patch', 'Notificar Usuários', 'Reiniciar DB'].map((op, i) => (
          <label key={i} style={styles.radioLabel}>
            <input type="radio" name="mod1" onChange={() => setSelected(op.toLowerCase().replace(' ', ''))} /> {op}
          </label>
        ))}
      </div>
      <button style={styles.moduleBtn} onClick={() => selected === 'isolarservidor' ? onSolved() : onStrike("Falha de contenção perimetral primária.")}>Executar Medida</button>
    </div>
  );
}

// Módulo 2: Colapso do Suporte (APO12)
function Modulo02({ onSolved, onStrike }) {
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE MONITORAMENTO [ATIVO]</div>
      <p style={styles.moduleDesc}>Volumetria Indeterminada: <span style={{ color: '#ff0055', fontWeight: 'bold' }}>99.999+</span></p>
      <div style={styles.fakeChart}>
        <div style={{ ...styles.chartBar, height: '40%' }}></div>
        <div style={{ ...styles.chartBar, height: '70%' }}></div>
        <div style={{ ...styles.chartBar, height: '100%', backgroundColor: '#ff0055' }}></div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{ ...styles.moduleBtn, flex: 1 }} onClick={onSolved}>Propagar Comunicado</button>
        <button style={{ ...styles.moduleBtn, backgroundColor: '#ff0055', flex: 1 }} onClick={() => onStrike("Omissão de incidente regulatório detectado!")}>Reter Registro</button>
      </div>
    </div>
  );
}

// Módulo 3: Labirinto de Ativos (BAI09)
function Modulo03({ onSolved, onStrike, serialNumber }) {
  const servidores = ['SRV-Alpha', 'SRV-Beta', 'SRV-Zeta', 'SRV-Omicron', 'SRV-Gamma'];
  const handleSelect = (srv) => {
    const lastChar = serialNumber.charAt(serialNumber.length - 1);
    const correctServer = isNaN(parseInt(lastChar)) ? 'SRV-Zeta' : 'SRV-Beta';
    if (srv === correctServer) onSolved();
    else onStrike(`Redirecionamento inválido para o sufixo: ${lastChar}`);
  };
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE MAPEAMENTO [ATIVO]</div>
      <p style={styles.moduleDesc}>Estruturas de Nós de Redes Locais Detectadas:</p>
      <table style={styles.retroTable}>
        <thead>
          <tr><th>Identificador</th><th>Status</th><th>Ação</th></tr>
        </thead>
        <tbody>
          {servidores.map((srv, idx) => (
            <tr key={idx}>
              <td>{srv}</td>
              <td style={{ color: '#ffd700' }}>ONLINE</td>
              <td><button style={styles.tableBtn} onClick={() => handleSelect(srv)}>Vincular</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Módulo 4: Caça à Causa Raiz (MEA02)
function Modulo04({ onSolved, onStrike }) {
  const [input, setInput] = useState('');
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE CONSOLE [ATIVO]</div>
      <div style={styles.codeSnippet}><code>SELECT * FROM users WHERE id = '' OR 1=1;</code></div>
      <form onSubmit={(e) => { e.preventDefault(); input.toLowerCase().trim() === 'sql injection' ? onSolved() : onStrike("Vetor de ataque incorreto."); }} style={styles.inlineForm}>
        <input type="text" placeholder="Diagnóstico..." style={styles.retroInputClean} value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit" style={styles.moduleBtn}>Submeter</button>
      </form>
    </div>
  );
}

// Módulo 5: Purga de Credenciais (DSS06)
function Modulo05({ onSolved, onStrike }) {
  const sessoes = [
    { ip: '192.168.1.50', local: 'Intranet Admin', t: false },
    { ip: '200.45.12.189', local: 'External Unscheduled', t: true },
    { ip: '10.0.0.12', local: 'Gateway Tunnel', t: false }
  ];
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE SESSÕES [ATIVO]</div>
      <p style={styles.moduleDesc}>Gerenciamento de conexões de túnel em tempo real:</p>
      {sessoes.map((s, i) => (
        <div key={i} style={styles.sessionRow}>
          <span>{s.ip} &gt;&gt; {s.local}</span>
          <button style={styles.tableBtn} onClick={() => s.t ? onSolved() : onStrike("Desconexão indevida de operação autorizada.")}>Terminar</button>
        </div>
      ))}
    </div>
  );
}

// Módulo 6: Sobrecarga de Tráfego (APO08)
function Modulo06({ onSolved, onStrike, batteries }) {
  const [val, setVal] = useState(50);
  const handleConfirm = () => {
    let target = 75;
    if (batteries === 1) target = 40;
    if (batteries === 2) target = 60;
    if (batteries === 3) target = 85;
    parseInt(val) === target ? onSolved() : onStrike("Gargalo térmico/orçamentário atingido.");
  };
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE CAPACIDADE [ATIVO]</div>
      <p style={styles.moduleDesc}>Balanceamento de Carga de Processamento:</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '15px 0' }}>
        <input type="range" min="0" max="100" value={val} onChange={e => setVal(e.target.value)} style={{ flex: 1 }} />
        <span style={{ fontSize: '20px', color: '#ffd700', width: '50px' }}>{val}%</span>
      </div>
      <button style={styles.moduleBtn} onClick={handleConfirm}>Estabilizar Fluxo</button>
    </div>
  );
}

// Módulo 7: Protocolo de Desastre (DSS04)
function Modulo07({ onSolved, onStrike }) {
  const [sequence, setSequence] = useState([]);
  const orderMap = { 'DB Auxiliar': 1, 'Firewall B': 2, 'Roteador 2': 3 };
  const handleToggle = (key) => {
    const nextSeq = [...sequence, orderMap[key]];
    if (nextSeq[nextSeq.length - 1] !== nextSeq.length) { setSequence([]); onStrike("Ordem cronológica violada! Chaves reiniciadas."); }
    else { setSequence(nextSeq); if (nextSeq.length === 3) onSolved(); }
  };
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT INTERRUPTOR [ATIVO]</div>
      <p style={styles.moduleDesc}>Comutadores Analógicos de Contingência Sequencial:</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '15px 0' }}>
        {Object.keys(orderMap).map((name, i) => (
          <button key={i} style={{ ...styles.tableBtn, padding: '10px', backgroundColor: sequence.includes(orderMap[name]) ? '#00ff66' : '#222', color: sequence.includes(orderMap[name]) ? '#000' : '#fff' }} onClick={() => handleToggle(name)}>{name}</button>
        ))}
      </div>
    </div>
  );
}

// Módulo 8: O Patch e a LGPD (MEA03)
function Modulo08({ onSolved, onStrike }) {
  const [pin, setPin] = useState('');
  const handleNum = (num) => {
    const current = pin + num;
    if (current.length === 4) {
      if (current === '2623') onSolved();
      else { setPin(''); onStrike("Assinatura digital corrompida."); }
    } else setPin(current);
  };
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT MATRIZ NUMÉRICA [ATIVO]</div>
      <div style={styles.keypadContainer}>
        <div style={styles.keypadDisplay}>{pin.padEnd(4, '_')}</div>
        <div style={styles.keypadGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => <button key={n} style={styles.keyBtn} onClick={() => handleNum(n)}>{n}</button>)}
        </div>
      </div>
    </div>
  );
}

// Módulo 9: O Relatório da Diretoria (MEA01)
function Modulo09({ onSolved, onStrike }) {
  const [checked, setChecked] = useState({ seg: false, cust: false, mkt: false });
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT AUDITORIA MÁSTER [ATIVO]</div>
      <p style={styles.moduleDesc}>Selecione as métricas para compilação regulatória:</p>
      <div style={styles.radioGroup}>
        <label style={styles.radioLabel}><input type="checkbox" onChange={e => setChecked({...checked, seg: e.target.checked})} /> Contas Comprometidas (Métrica A)</label>
        <label style={styles.radioLabel}><input type="checkbox" onChange={e => setChecked({...checked, cust: e.target.checked})} /> Custo do Servidor (Métrica B)</label>
        <label style={styles.radioLabel}><input type="checkbox" onChange={e => setChecked({...checked, mkt: e.target.checked})} /> Pico de Jogadores (Métrica C)</label>
      </div>
      <button style={styles.moduleBtn} onClick={() => (checked.seg && checked.cust && !checked.mkt) ? onSolved() : onStrike("Ata rejeitada por excesso de ruído comercial.")}>Despachar Ata</button>
    </div>
  );
}

// Módulo 10: Cofre Criptográfico (EDM03 - Governança de Transparência)
function Modulo10({ onSolved, onStrike }) {
  const [clicks, setClicks] = useState(0);
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE INTEGRALIDADE [ATIVO]</div>
      <p style={styles.moduleDesc}>Verificação de chaves públicas. Pressione o acionador exatamente 5 vezes:</p>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', margin: '15px 0' }}>
        <button style={{ ...styles.moduleBtn, backgroundColor: '#ff0055', width: '80px', height: '80px', borderRadius: '50%' }} onClick={() => setClicks(clicks + 1)}>PULSAR</button>
        <span style={{ fontSize: '24px', color: '#fff' }}>REG: {clicks}</span>
      </div>
      <button style={styles.moduleBtn} onClick={() => clicks === 5 ? onSolved() : (setClicks(0), onStrike("Assincronia de auditoria EDM03."))}>Validar Pulso</button>
    </div>
  );
}

// Módulo 11: Classificação de Dados (APO11 - Gestão de Qualidade)
function Modulo11({ onSolved, onStrike }) {
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE CLASSIFICAÇÃO [ATIVO]</div>
      <p style={styles.moduleDesc}>Destino de log: Dados médicos identificáveis de colaboradores e terceiros:</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {['Público', 'Confidencial', 'Restrito'].map((level, i) => (
          <button key={i} style={{ ...styles.moduleBtn, flex: 1 }} onClick={() => level === 'Confidencial' ? onSolved() : onStrike("Vazamento por classificação errônea APO11.")}>{level}</button>
        ))}
      </div>
    </div>
  );
}

// Módulo 12: Termômetro SLA (DSS01 - Gestão de Operações)
function Modulo12({ onSolved, onStrike }) {
  const [temp, setTemp] = useState(15);
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE TELEMETRIA [ATIVO]</div>
      <p style={styles.moduleDesc}>Temperatura do Data Center: <span style={{ color: temp > 40 ? '#ff0055' : '#ffd700' }}>{temp}°C</span></p>
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        <button style={{ ...styles.tableBtn, flex: 1 }} onClick={() => setTemp(temp + 5)}>Elevar Carga</button>
        <button style={{ ...styles.tableBtn, flex: 1 }} onClick={() => setTemp(temp - 5)}>Resfriar</button>
      </div>
      <button style={styles.moduleBtn} onClick={() => temp === 25 ? onSolved() : onStrike("SLA violado! Sistema fora da faixa operacional estável.")}>Fixar SLA</button>
    </div>
  );
}

// Módulo 13: Matriz de Fornecedores (APO10 - Gestão de Fornecedores)
function Modulo13({ onSolved, onStrike }) {
  const [vendor, setVendor] = useState('');
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE PROVEDORES [ATIVO]</div>
      <p style={styles.moduleDesc}>Selecione o provedor de Cloud com certificação de compliance ativa:</p>
      <select style={styles.retroInput} onChange={e => setVendor(e.target.value)} defaultValue="">
        <option value="" disabled>Selecionar...</option>
        <option value="v1">NexusHosting (Sem SLA)</option>
        <option value="v2">ApexCloud Enterprise (SOC2/ISO)</option>
        <option value="v3">GlobalStorage (EUA Only)</option>
      </select>
      <button style={{ ...styles.moduleBtn, marginTop: '15px' }} onClick={() => vendor === 'v2' ? onSolved() : onStrike("Fornecedor sem conformidade técnica contratado!")}>Vincular Cloud</button>
    </div>
  );
}

// Módulo 14: Inventário de Software (BAI10 - Gestão de Configuração)
function Modulo14({ onSolved, onStrike }) {
  const assets = [{ name: 'Apache v2.2 (Depreciado)', danger: true }, { name: 'Node.js v20 (LTS)', danger: false }, { name: 'PostgreSQL v16', danger: false }];
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT DE INVENTÁRIO [ATIVO]</div>
      <p style={styles.moduleDesc}>Remova a dependência obsoleta com brechas de segurança conhecidas:</p>
      {assets.map((a, i) => (
        <div key={i} style={styles.sessionRow}>
          <span>{a.name}</span>
          <button style={styles.tableBtn} onClick={() => a.danger ? onSolved() : onStrike("Remoção incorreta de ativo crítico em produção!")}>Expurgar</button>
        </div>
      ))}
    </div>
  );
}

// Módulo 15: Simulação de Phishing (BAI05 - Gestão de Mudança Organizacional)
function Modulo15({ onSolved, onStrike }) {
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT COMUNICAÇÃO INTERNA [ATIVO]</div>
      <div style={styles.codeSnippet}><code>DE: admin@banc0-gti.com | ASSUNTO: ATUALIZAÇÃO RESTRITA DA DIRETORIA!</code></div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{ ...styles.moduleBtn, backgroundColor: '#ff0055', flex: 1 }} onClick={() => onStrike("Ataque de engenharia social bem-sucedido na empresa.")}>Baixar Anexo</button>
        <button style={{ ...styles.moduleBtn, flex: 1 }} onClick={onSolved}>Denunciar Phishing</button>
      </div>
    </div>
  );
}

// Módulo 16: Linha de Base de Orçamento (APO06 - Gestão de Custos)
function Modulo16({ onSolved, onStrike }) {
  const [cost, setCost] = useState(0);
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT ORÇAMENTÁRIO [ATIVO]</div>
      <p style={styles.moduleDesc}>Ajuste o aporte para o CAPEX de segurança anual da empresa:</p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '15px 0' }}>
        <button style={styles.tableBtn} onClick={() => setCost(cost - 50)}>-50k</button>
        <span style={{ fontSize: '18px', color: '#ffd700', width: '100px', textAlign: 'center' }}>${cost}k USD</span>
        <button style={styles.tableBtn} onClick={() => setCost(cost + 50)}>+50k</button>
      </div>
      <button style={styles.moduleBtn} onClick={() => cost === 150 ? onSolved() : onStrike("Orçamento desalinhado com o Planejamento Estratégico APO06.")}>Validar CAPEX</button>
    </div>
  );
}

// Módulo 17: Auditoria Concorrente (MEA02 - Monitorar Segurança)
function Modulo17({ onSolved, onStrike }) {
  const [val, setVal] = useState('');
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT CENTRAL DE VERIFICAÇÃO [ATIVO]</div>
      <p style={styles.moduleDesc}>Selecione o tipo de auditoria obrigatória requerida pela ANPD:</p>
      <div style={styles.radioGroup}>
        {['Auditoria Interna Anual', 'Auditoria Externa Independente', 'Varredura Automatizada'].map((op, i) => (
          <label key={i} style={styles.radioLabel}>
            <input type="radio" name="mod17" onChange={() => setVal(op)} /> {op}
          </label>
        ))}
      </div>
      <button style={styles.moduleBtn} onClick={() => val === 'Auditoria Externa Independente' ? onSolved() : onStrike("Nível de idoneidade insuficiente para a ANPD.")}>Emitir Laudo</button>
    </div>
  );
}

// Módulo 18: Gestão de Identidade (DSS05 - Controle de Privilégios)
function Modulo18({ onSolved, onStrike }) {
  const roles = [{ name: 'Estagiário de Dev', role: 'Root Admin', s: true }, { name: 'CTO Executive', role: 'Global Admin', s: false }, { name: 'Analista de Infra', role: 'SysOps Admin', s: false }];
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>SLOT CONTROLE DE ACESSOS [ATIVO]</div>
      <p style={styles.moduleDesc}>Mapeamento de Matriz de Privilégios Corporativos:</p>
      {roles.map((r, i) => (
        <div key={i} style={styles.sessionRow}>
          <span>{r.name} &gt; {r.role}</span>
          <button style={styles.tableBtn} onClick={() => r.s ? onSolved() : onStrike("Erro de revogação. Princípio do menor privilégio quebrado.")}>Revogar Perfil</button>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL DO JOGO E GESTÃO DE RANKING LOCAL (SEM BANCO DE DADOS)
// ============================================================================

export default function App() {
  const [gameState, setGameState] = useState('START');
  const [teamName, setTeamName] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [finalTime, setFinalTime] = useState(0);

  const [serialNumber, setSerialNumber] = useState('');
  const [batteriesCount, setBatteriesCount] = useState(1);

  const [activeModuleIds, setActiveModuleIds] = useState([]);
  const [solvedModules, setSolvedModules] = useState([]);
  const [strikes, setStrikes] = useState(0); 
  const [strikeAlert, setStrikeAlert] = useState('');

  // Tabela de Classificação Local (Salva na memória da sessão do navegador)
  const [ranking, setRanking] = useState([]);

  const getTimeSpeedMultiplier = () => {
    if (strikes === 1) return 1.35;
    if (strikes === 2) return 1.75;
    return 1.0;
  };

  useEffect(() => {
    let timer;
    if (gameState === 'PLAYING' && timeRemaining > 0) {
      const currentSpeed = 1000 / getTimeSpeedMultiplier();
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame('LOSE');
            return 0;
          }
          return prev - 1;
        });
      }, currentSpeed);
    }
    return () => clearInterval(timer);
  }, [gameState, timeRemaining, strikes]);

  const generateCrisisEnvironment = () => {
    // Sorteia 3 módulos únicos dentro do universo expandido de 18 módulos
    const totalModules = Array.from({ length: 18 }, (_, i) => i + 1);
    const shuffled = totalModules.sort(() => 0.5 - Math.random());
    setActiveModuleIds(shuffled.slice(0, 3));

    const midDigits = Math.floor(1000 + Math.random() * 9000);
    const suffixes = ['X', 'Z', 'N', '4', '7', '2'];
    setSerialNumber(`GTI-${midDigits}-${suffixes[Math.floor(Math.random() * suffixes.length)]}`);
    setBatteriesCount(Math.floor(Math.random() * 3) + 1);
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      generateCrisisEnvironment();
      setGameState('MANUAL_QR');
    }
  };

  const startBomb = () => {
    setTimeRemaining(300);
    setSolvedModules([]);
    setStrikes(0);
    setStrikeAlert('');
    setGameState('PLAYING');
  };

  const endGame = (result) => {
    const calculatedFinalTime = 300 - timeRemaining;
    setFinalTime(calculatedFinalTime);
    setGameResult(result);

    // Se o time vencer, salva o registro no ranking local
    if (result === 'WIN') {
      const currentRun = {
        name: teamName.toUpperCase(),
        time: calculatedFinalTime,
        strikesCommitted: strikes,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setRanking((prevRanking) => {
        const updated = [...prevRanking, currentRun];
        // Ordenação competitiva: Menor tempo de resposta, desempatando por menor número de strikes
        return updated.sort((a, b) => a.time - b.time || a.strikesCommitted - b.strikesCommitted);
      });
    }
    setGameState('GAME_OVER');
  };

  const handleModuleSolved = (id) => {
    if (!solvedModules.includes(id)) {
      const updated = [...solvedModules, id];
      setSolvedModules(updated);
      setStrikeAlert(`✓ Um canal de redundância foi liberado.`);
      if (updated.length === 3) endGame('WIN');
    }
  };

  const handleModuleStrike = (msg) => {
    const nextStrikes = strikes + 1;
    setStrikes(nextStrikes);
    if (nextStrikes >= 3) {
      setStrikeAlert("🚨 COLAPSO TOTAL DA INFRAESTRUTURA!");
      endGame('LOSE');
    } else {
      setStrikeAlert(`🚨 VIOLAÇÃO: ${msg}`);
      setTimeRemaining((prev) => Math.max(0, prev - 30));
    }
  };

  const renderModule = (id) => {
    if (solvedModules.includes(id)) {
      return (
        <div style={{ ...styles.moduleCard, borderColor: '#00ff66' }} key={id}>
          <div style={styles.moduleHeader}>SLOT INTEGRALIZADO <span style={styles.ledGreen}></span></div>
          <p style={{ color: '#00ff66', textAlign: 'center', padding: '30px' }}>✓ ESTÁVEL / EM COMPLIANCE</p>
        </div>
      );
    }

    switch(id) {
      case 1: return <Modulo01 key={id} onSolved={() => handleModuleSolved(1)} onStrike={handleModuleStrike} />;
      case 2: return <Modulo02 key={id} onSolved={() => handleModuleSolved(2)} onStrike={handleModuleStrike} />;
      case 3: return <Modulo03 key={id} onSolved={() => handleModuleSolved(3)} onStrike={handleModuleStrike} serialNumber={serialNumber} />;
      case 4: return <Modulo04 key={id} onSolved={() => handleModuleSolved(4)} onStrike={handleModuleStrike} />;
      case 5: return <Modulo05 key={id} onSolved={() => handleModuleSolved(5)} onStrike={handleModuleStrike} />;
      case 6: return <Modulo06 key={id} onSolved={() => handleModuleSolved(6)} onStrike={handleModuleStrike} batteries={batteriesCount} />;
      case 7: return <Modulo07 key={id} onSolved={() => handleModuleSolved(7)} onStrike={handleModuleStrike} />;
      case 8: return <Modulo08 key={id} onSolved={() => handleModuleSolved(8)} onStrike={handleModuleStrike} />;
      case 9: return <Modulo09 key={id} onSolved={() => handleModuleSolved(9)} onStrike={handleModuleStrike} />;
      case 10: return <Modulo10 key={id} onSolved={() => handleModuleSolved(10)} onStrike={handleModuleStrike} />;
      case 11: return <Modulo11 key={id} onSolved={() => handleModuleSolved(11)} onStrike={handleModuleStrike} />;
      case 12: return <Modulo12 key={id} onSolved={() => handleModuleSolved(12)} onStrike={handleModuleStrike} />;
      case 13: return <Modulo13 key={id} onSolved={() => handleModuleSolved(13)} onStrike={handleModuleStrike} />;
      case 14: return <Modulo14 key={id} onSolved={() => handleModuleSolved(14)} onStrike={handleModuleStrike} />;
      case 15: return <Modulo15 key={id} onSolved={() => handleModuleSolved(15)} onStrike={handleModuleStrike} />;
      case 16: return <Modulo16 key={id} onSolved={() => handleModuleSolved(16)} onStrike={handleModuleStrike} />;
      case 17: return <Modulo17 key={id} onSolved={() => handleModuleSolved(17)} onStrike={handleModuleStrike} />;
      case 18: return <Modulo18 key={id} onSolved={() => handleModuleSolved(18)} onStrike={handleModuleStrike} />;
      default: return null;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.bodyContainer}>
      <div style={styles.retroTerminal}>
        <header style={styles.terminalHeader}>
          <div>PAINEL OPERACIONAL CRÍTICO GTI v7.5</div>
          <div>MÓDULOS DE SLA ÀS CEGAS // LEILÃO DE TEMPO</div>
        </header>

        {gameState === 'START' && (
          <div style={styles.centerScreen}>
            <h1 style={styles.glitchTitle}>PROJECT: KEEP TALK GTI</h1>
            <p style={styles.subtitle}>COBIT / ITIL Sandbox Blind Server Assessment</p>
            <button style={styles.retroButton} onClick={() => setGameState('TEAM_INPUT')}>CONFIGURAR SESSÃO DE CRISE</button>
          </div>
        )}

        {gameState === 'TEAM_INPUT' && (
          <div style={styles.centerScreen}>
            <h2>AUTENTICAÇÃO DE OPERADORES DE INFRAESTRUTURA</h2>
            <form onSubmit={handleTeamSubmit} style={styles.form}>
              <label style={styles.label}>NOME DO CLUSTER / TIME:</label>
              <input type="text" style={styles.retroInput} value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Ex: ALPHA_TEAM_GTI" required />
              <button type="submit" style={styles.retroButton}>CRIPTOGRAFAR SLOTS</button>
            </form>
          </div>
        )}

        {gameState === 'MANUAL_QR' && (
          <div style={styles.centerScreen}>
            <h2>MATRIZ DE REGULAÇÃO LIBERADA (ANPD / COBIT / ITIL)</h2>
            <p style={{ color: '#ffd700', marginBottom: '20px' }}>O comitê precisa escanear o QR Code para ler as diretrizes cegas.</p>
            <div style={styles.qrContainer}><img src={QR_CODE_API} alt="QR Code" style={{ display: 'block' }} /></div>
            <p style={styles.codeText}>Sistemas Armados em Operação: [3 SLOTS CRIPTOGRAFADOS CARREGADOS]</p>
            <button style={styles.retroButton} onClick={startBomb}>ENTRAR NO TERMINAL COBIÇADO</button>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div style={styles.gameGrid}>
            <div style={styles.sidebar}>
              <div style={styles.panelTitle}>STATUS DA INFRAESTRUTURA</div>
              <div style={{ ...styles.countdown, color: timeRemaining < 60 ? '#ff0055' : '#00ff66' }}>{formatTime(timeRemaining)}</div>
              
              <div style={styles.strikeContainer}>
                <span style={{ color: '#aaa', fontSize: '11px' }}>VIOLAÇÕES DE POLÍTICA: </span>
                <span style={{ color: strikes > 0 ? '#ff0055' : '#333', fontSize: '20px', fontWeight: 'bold' }}>X </span>
                <span style={{ color: strikes > 1 ? '#ff0055' : '#333', fontSize: '20px', fontWeight: 'bold' }}>X </span>
                <span style={{ color: strikes > 2 ? '#ff0055' : '#333', fontSize: '20px', fontWeight: 'bold' }}>X</span>
              </div>

              <div style={styles.hardwarePanel}>
                <div style={styles.hardwareHeader}>METADADOS DO INTEGRALIZADOR</div>
                <p><strong>SERIAL ID:</strong> <span style={{color: '#ffd700'}}>{serialNumber}</span></p>
                <p><strong>CÉLULAS BACKUP:</strong> <span style={{color: '#ffd700'}}>{batteriesCount} UND</span></p>
              </div>

              <div style={styles.metaData}>
                <p><strong>TIME ATIVO:</strong> {teamName}</p>
                <p><strong>SLOTS FECHADOS:</strong> {solvedModules.length} / 3</p>
                {getTimeSpeedMultiplier() > 1 && <p style={{color: '#ff0055', fontWeight: 'bold'}}>⚠️ DRIFT DO RELÓGIO: {getTimeSpeedMultiplier()}x</p>}
              </div>
              {strikeAlert && <div style={styles.alertText}>{strikeAlert}</div>}
            </div>
            <div style={styles.modulesContainer}>{activeModuleIds.map(id => renderModule(id))}</div>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div style={styles.centerScreen}>
            {gameResult === 'WIN' ? (
              <h1 style={{...styles.glitchTitle, color: '#00ff66'}}>MIGRAÇÃO EXECUTADA COM SUCESSO!</h1>
            ) : (
              <h1 style={{...styles.glitchTitle, color: '#ff0055'}}>SISTEMA COMPROMETIDO (EXPLODIDO)!</h1>
            )}

            <div style={styles.scoreBox}>
              <h3 style={{ color: '#ffd700', marginTop: 0, textTransform: 'uppercase' }}>Histórico Competitivo (Sessão Atual)</h3>
              {ranking.length === 0 ? (
                <p style={{ color: '#888', fontSize: '12px' }}>Nenhum time completou em compliance ainda.</p>
              ) : (
                <table style={{ ...styles.retroTable, marginTop: '10px' }}>
                  <thead>
                    <tr>
                      <th>Pos</th>
                      <th>Cluster/Time</th>
                      <th>Tempo de Resposta</th>
                      <th>Strikes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.map((run, idx) => (
                      <tr key={idx} style={run.name === teamName.toUpperCase() ? { backgroundColor: '#222', border: '1px solid #00ff66' } : {}}>
                        <td style={{ color: idx === 0 ? '#ffd700' : '#00ff66' }}>{idx + 1}º</td>
                        <td>{run.name}</td>
                        <td>{formatTime(run.time)}</td>
                        <td>{run.strikesCommitted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <button style={styles.retroButton} onClick={() => setGameState('START')}>REINICIAR SISTEMA</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  bodyContainer: { backgroundColor: '#0a0a0a', color: '#00ff66', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  retroTerminal: { width: '100%', maxWidth: '1200px', backgroundColor: '#121212', border: '4px solid #333', padding: '20px' },
  terminalHeader: { display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed #333', paddingBottom: '10px', marginBottom: '20px', fontSize: '11px', color: '#888' },
  centerScreen: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '30px 10px' },
  glitchTitle: { fontSize: '2.2rem', fontWeight: 'bold', margin: '0 0 10px 0', textShadow: '3px 3px #ff0055' },
  subtitle: { fontSize: '13px', color: '#ffd700', marginBottom: '35px' },
  retroButton: { backgroundColor: '#00ff66', color: '#000', border: 'none', padding: '14px 28px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '4px 4px 0px #ffd700' },
  form: { display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px', gap: '10px' },
  label: { color: '#fff', textAlign: 'left' },
  retroInput: { backgroundColor: '#000', border: '2px solid #ffd700', color: '#ffd700', padding: '12px', fontFamily: 'monospace', width: '100%' },
  retroInputClean: { backgroundColor: '#000', border: '1px solid #00ff66', color: '#00ff66', padding: '8px', fontFamily: 'monospace', flex: 1 },
  qrContainer: { backgroundColor: '#fff', padding: '10px', border: '4px solid #ffd700', marginBottom: '20px' },
  codeText: { color: '#ffd700', margin: '20px 0' },
  gameGrid: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px' },
  sidebar: { backgroundColor: '#000', border: '2px solid #333', padding: '15px' },
  panelTitle: { backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', padding: '5px', textAlign: 'center', fontSize: '12px' },
  countdown: { fontSize: '2.8rem', fontWeight: 'bold', textAlign: 'center', marginTop: '10px' },
  strikeContainer: { textAlign: 'center', padding: '5px', borderBottom: '1px solid #222', marginBottom: '15px' },
  hardwarePanel: { backgroundColor: '#111', border: '1px dashed #ffd700', padding: '10px', marginBottom: '15px', fontSize: '11px' },
  hardwareHeader: { color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #333', paddingBottom: '3px', marginBottom: '5px' },
  metaData: { borderTop: '1px solid #333', paddingTop: '10px', fontSize: '11px', color: '#aaa' },
  modulesContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
  moduleCard: { backgroundColor: '#151515', border: '2px solid #ff0055', padding: '15px' },
  moduleHeader: { fontWeight: 'bold', borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '10px', color: '#ff0055', fontSize: '12px', letterSpacing: '1px' },
  moduleDesc: { fontSize: '12px', color: '#ccc', marginBottom: '15px' },
  radioGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' },
  radioLabel: { color: '#ffd700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  moduleBtn: { backgroundColor: '#ffd700', color: '#000', border: 'none', padding: '10px 16px', fontWeight: 'bold', cursor: 'pointer' },
  alertText: { marginTop: '20px', padding: '10px', backgroundColor: '#220005', borderLeft: '3px solid #ff0055', fontSize: '11px' },
  ledGreen: { width: '10px', height: '10px', backgroundColor: '#00ff66', borderRadius: '50%', display: 'inline-block' },
  fakeChart: { display: 'flex', alignItems: 'flex-end', gap: '10px', height: '50px', backgroundColor: '#000', padding: '10px', marginBottom: '15px' },
  chartBar: { width: '30%', backgroundColor: '#ffd700' },
  retroTable: { width: '100%', borderCollapse: 'collapse', marginBottom: '15px', fontSize: '11px' },
  tableBtn: { backgroundColor: '#333', color: '#00ff66', border: '1px solid #00ff66', padding: '4px 8px', cursor: 'pointer' },
  codeSnippet: { backgroundColor: '#000', padding: '10px', border: '1px dashed #ffd700', color: '#00ff66', marginBottom: '15px', fontSize: '11px' },
  inlineForm: { display: 'flex', gap: '10px' },
  sessionRow: { display: 'flex', justifyContent: 'space-between', padding: '6px', backgroundColor: '#000', marginBottom: '5px', fontSize: '11px', alignItems: 'center' },
  keypadContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  keypadDisplay: { backgroundColor: '#000', border: '2px solid #ff0055', color: '#ff0055', fontSize: '20px', padding: '5px 20px', width: '100px', textAlign: 'center', letterSpacing: '4px' },
  keypadGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' },
  keyBtn: { backgroundColor: '#222', color: '#fff', border: '1px solid #444', padding: '8px', cursor: 'pointer', fontWeight: 'bold' },
  scoreBox: { border: '2px dashed #00ff66', padding: '15px', backgroundColor: '#000', margin: '20px 0', width: '100%', maxWidth: '600px', textAlign: 'left' }
};