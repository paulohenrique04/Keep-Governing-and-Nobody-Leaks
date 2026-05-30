import { useState, useEffect } from 'react';

// Link fictício do Google Drive para o manual
const MANUAL_DRIVE_URL = "https://drive.google.com/file/d/YOUR_MANUAL_ID/view";
const QR_CODE_API = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(MANUAL_DRIVE_URL)}`;

// ==========================================
// BANCO DE COMPONENTES DOS 9 MÓDULOS (DINÂMICOS)
// ==========================================

// Módulo 1: Alarme Primário (DSS05 + Incidentes)
function Modulo01({ onSolved, onStrike }) {
  const [selected, setSelected] = useState('');
  const handleExecute = () => {
    if (selected === 'isolar') onSolved();
    else onStrike("Mudança não autorizada / Falha de contenção DSS05");
  };
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_01: ALARME PRIMÁRIO (DSS05)</div>
      <p style={{ ...styles.moduleDesc, color: '#ff0055', animation: 'blink 1s infinite' }}>⚠️ EXTRAÇÃO DETECTADA: VAZAMENTO DE ATIVOS</p>
      <div style={styles.radioGroup}>
        {['Isolar Servidor', 'Aplicar Patch', 'Notificar Usuários', 'Reiniciar DB'].map((op, i) => {
          const val = op.toLowerCase().replace(' ', '');
          return (
            <label key={i} style={styles.radioLabel}>
              <input type="radio" name="mod1" onChange={() => setSelected(val)} /> {op}
            </label>
          );
        })}
      </div>
      <button style={styles.moduleBtn} onClick={handleExecute}>Executar Medida</button>
    </div>
  );
}

// Módulo 2: Colapso do Suporte (APO12 + Service Desk)
function Modulo02({ onSolved, onStrike }) {
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_02: COLAPSO DO SUPORTE (APO12)</div>
      <p style={styles.moduleDesc}>Fila de Chamados: <span style={{ color: '#ff0055', fontWeight: 'bold' }}>99.999+</span></p>
      <div style={styles.fakeChart}>
        <div style={{ ...styles.chartBar, height: '40%' }}></div>
        <div style={{ ...styles.chartBar, height: '70%' }}></div>
        <div style={{ ...styles.chartBar, height: '100%', backgroundColor: '#ff0055' }}></div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{ ...styles.moduleBtn, flex: 1 }} onClick={onSolved}>Notificar Imprensa</button>
        <button style={{ ...styles.moduleBtn, backgroundColor: '#ff0055', flex: 1 }} onClick={() => onStrike("Violação grave de Governança da LGPD!")}>Reter Comunicação</button>
      </div>
    </div>
  );
}

// Módulo 3: Labirinto de Ativos (BAI09 + SACM) - RESPOSTA DINÂMICA
function Modulo03({ onSolved, onStrike, serialNumber }) {
  const servidores = ['SRV-Alpha', 'SRV-Beta', 'SRV-Zeta', 'SRV-Omicron', 'SRV-Gamma'];
  
  const handleSelect = (srv) => {
    // LÓGICA DINÂMICA: Verifica se o último caractere do Serial é Letra ou Número
    const lastChar = serialNumber.charAt(serialNumber.length - 1);
    const isLetter = isNaN(parseInt(lastChar));
    const correctServer = isLetter ? 'SRV-Zeta' : 'SRV-Beta';

    if (srv === correctServer) onSolved();
    else onStrike(`Ativo incorreto! O Servidor alvo dependia do sufixo do Serial (${lastChar}).`);
  };

  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_03: LABIRINTO DE ATIVOS (BAI09)</div>
      <p style={styles.moduleDesc}>Selecione o servidor que hospeda a base protegida (Consulte Regra de Sufixo):</p>
      <table style={styles.retroTable}>
        <thead>
          <tr><th>Identificador</th><th>Status</th><th>Ação</th></tr>
        </thead>
        <tbody>
          {servidores.map((srv, idx) => (
            <tr key={idx}>
              <td>{srv}</td>
              <td style={{ color: '#ffd700' }}>ONLINE</td>
              <td><button style={styles.tableBtn} onClick={() => handleSelect(srv)}>Inspecionar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Módulo 4: Caça à Causa Raiz (MEA02 + Problemas)
function Modulo04({ onSolved, onStrike }) {
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === 'sql injection') onSolved();
    else onStrike("Diagnóstico de causa raiz incorreto!");
  };
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_04: CAÇA À CAUSA RAIZ (MEA02)</div>
      <div style={styles.codeSnippet}>
        <code>SELECT * FROM users WHERE id = '' OR 1=1;</code>
      </div>
      <form onSubmit={handleSubmit} style={styles.inlineForm}>
        <input 
          type="text" 
          placeholder="Tipo de Ataque..." 
          style={styles.retroInputClean} 
          value={input} 
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" style={styles.moduleBtn}>Analisar</button>
      </form>
    </div>
  );
}

// Módulo 5: Purga de Credenciais (DSS06 + Acessos)
function Modulo05({ onSolved, onStrike }) {
  const sessoes = [
    { ip: '192.168.1.50', hora: '10:15', local: 'Interno (Admin)', target: false },
    { ip: '200.45.12.189', hora: '03:42', local: 'Externo (Fora do Horário)', target: true },
    { ip: '10.0.0.12', hora: '14:20', local: 'VPN Corporativa', target: false }
  ];
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_05: PURGA DE CREDENCIAIS (DSS06)</div>
      <p style={styles.moduleDesc}>Desconecte sessões externas fora do horário comercial:</p>
      {sessoes.map((s, i) => (
        <div key={i} style={styles.sessionRow}>
          <span>{s.ip} [{s.hora}] - {s.local}</span>
          <button style={styles.tableBtn} onClick={() => s.target ? onSolved() : onStrike("Acesso legítimo derrubado! Operação impactada.")}>Derrubar</button>
        </div>
      ))}
    </div>
  );
}

// Módulo 6: Sobrecarga de Tráfego (APO08 + Capacidade) - RESPOSTA DINÂMICA
function Modulo06({ onSolved, onStrike, batteries }) {
  const [val, setVal] = useState(50);
  
  const handleConfirm = () => {
    // LÓGICA DINÂMICA: Meta depende da infraestrutura de baterias de backup detectadas
    let targetValue = 75; 
    if (batteries === 1) targetValue = 40;
    if (batteries === 2) targetValue = 60;
    if (batteries === 3) targetValue = 85;

    if (parseInt(val) === targetValue) onSolved();
    else onStrike(`Capacidade incorreta (${val}%). Para ${batteries} Bateria(s), o teto técnico diverge.`);
  };

  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_06: SOBRECARGA DE TRÁFEGO (APO08)</div>
      <p style={styles.moduleDesc}>Gargalo crítico! Calcule a carga ideal conforme as Baterias de Backup:</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '15px 0' }}>
        <input type="range" min="0" max="100" value={val} onChange={e => setVal(e.target.value)} style={{ flex: 1 }} />
        <span style={{ fontSize: '20px', color: '#ffd700', width: '50px' }}>{val}%</span>
      </div>
      <button style={styles.moduleBtn} onClick={handleConfirm}>Confirmar Alocação</button>
    </div>
  );
}

// Módulo 7: Protocolo de Desastre (DSS04 + Continuidade)
function Modulo07({ onSolved, onStrike }) {
  const [sequence, setSequence] = useState([]);
  const orderMap = { 'DB Auxiliar': 1, 'Firewall B': 2, 'Roteador 2': 3 };

  const handleToggle = (key) => {
    const nextSeq = [...sequence, orderMap[key]];
    if (nextSeq[nextSeq.length - 1] !== nextSeq.length) {
      setSequence([]);
      onStrike("Sequência de contingência incorreta! Chaves desarmadas.");
    } else {
      setSequence(nextSeq);
      if (nextSeq.length === 3) onSolved();
    }
  };

  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_07: PROTOCOLO DE DESASTRE (DSS04)</div>
      <p style={styles.moduleDesc}>Ative a contingência na ordem cronológica estrita do manual:</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '15px 0' }}>
        {Object.keys(orderMap).map((name, i) => (
          <button 
            key={i} 
            style={{ 
              ...styles.tableBtn, 
              padding: '10px', 
              backgroundColor: sequence.includes(orderMap[name]) ? '#00ff66' : '#222',
              color: sequence.includes(orderMap[name]) ? '#000' : '#fff'
            }}
            onClick={() => handleToggle(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Módulo 8: O Patch e a LGPD (MEA03 + Mudanças)
function Modulo08({ onSolved, onStrike }) {
  const [pin, setPin] = useState('');
  const handleNum = (num) => {
    const current = pin + num;
    if (current.length === 4) {
      if (current === '2623') onSolved();
      else {
        setPin('');
        onStrike("Código PIN de auditoria rejeitado.");
      }
    } else {
      setPin(current);
    }
  };
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_08: O PATCH E A LGPD (MEA03)</div>
      <p style={styles.moduleDesc}>Digite o PIN de Autorização de Mudança (4 dígitos):</p>
      <div style={styles.keypadContainer}>
        <div style={styles.keypadDisplay}>{pin.padEnd(4, '_')}</div>
        <div style={styles.keypadGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
            <button key={n} style={styles.keyBtn} onClick={() => handleNum(n)}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Módulo 9: O Relatório da Diretoria (MEA01 + Melhoria)
function Modulo09({ onSolved, onStrike }) {
  const [checked, setChecked] = useState({ seguranca: false, custos: false, marketing: false });
  const handleCheck = () => {
    if (checked.seguranca && checked.custos && !checked.marketing) onSolved();
    else onStrike("Transparência corporativa falhou! Métricas inadequadas enviadas.");
  };
  return (
    <div style={styles.moduleCard}>
      <div style={styles.moduleHeader}>MOD_09: RELATÓRIO EXECUTIVO (MEA01)</div>
      <p style={styles.moduleDesc}>Selecione apenas as métricas exigidas pela diretoria:</p>
      <div style={styles.radioGroup}>
        <label style={styles.radioLabel}>
          <input type="checkbox" onChange={e => setChecked({...checked, seguranca: e.target.checked})} /> Contas Comprometidas (Segurança)
        </label>
        <label style={styles.radioLabel}>
          <input type="checkbox" onChange={e => setChecked({...checked, custos: e.target.checked})} /> Custo do Servidor (Custos)
        </label>
        <label style={styles.radioLabel}>
          <input type="checkbox" onChange={e => setChecked({...checked, marketing: e.target.checked})} /> Pico de Jogadores (Marketing)
        </label>
      </div>
      <button style={styles.moduleBtn} onClick={handleCheck}>Enviar Relatório</button>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL DO JOGO (GAME CORE)
// ==========================================

export default function App() {
  const [gameState, setGameState] = useState('START');
  const [teamName, setTeamName] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [finalTime, setFinalTime] = useState(0);

  // Atributos Randômicos da Infraestrutura (VITAL para engenharia reversa do manual)
  const [serialNumber, setSerialNumber] = useState('');
  const [batteriesCount, setBatteriesCount] = useState(1);

  // Estados dos Módulos e do Ecossistema de Erros
  const [activeModuleIds, setActiveModuleIds] = useState([]);
  const [solvedModules, setSolvedModules] = useState([]);
  const [strikes, setStrikes] = useState(0); 
  const [strikeAlert, setStrikeAlert] = useState('');

  // Define a velocidade do relógio com base nos erros (Mecânica Hardcore)
  const getTimeSpeedMultiplier = () => {
    if (strikes === 1) return 1.35; // 35% mais rápido
    if (strikes === 2) return 1.75; // 75% mais rápido
    return 1.0;
  };

  // Relógio com multiplicador adaptável de ticks dinâmicos
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

  // Sorteador de Módulos e Geração Dinâmica de Variáveis de Infraestrutura
  const generateCrisisEnvironment = () => {
    // 1. Sorteia os 3 módulos únicos
    const totalModules = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffled = totalModules.sort(() => 0.5 - Math.random());
    setActiveModuleIds(shuffled.slice(0, 3));

    // 2. Cria Serial Number aleatório (Metade termina em Letra, metade em Número)
    const midDigits = Math.floor(1000 + Math.random() * 9000);
    const suffixes = ['X', 'Z', 'N', '4', '7', '2'];
    const selectedSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    setSerialNumber(`GTI-${midDigits}-${selectedSuffix}`);

    // 3. Sorteia Baterias de Backup (1 a 3)
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
    setFinalTime(300 - timeRemaining);
    setGameResult(result);
    setGameState('GAME_OVER');
  };

  const handleModuleSolved = (id) => {
    if (!solvedModules.includes(id)) {
      const updated = [...solvedModules, id];
      setSolvedModules(updated);
      setStrikeAlert(`✓ Módulo 0${id} neutralizado com sucesso.`);
      if (updated.length === 3) {
        endGame('WIN');
      }
    }
  };

  const handleModuleStrike = (msg) => {
    const nextStrikes = strikes + 1;
    setStrikes(nextStrikes);
    
    if (nextStrikes >= 3) {
      setStrikeAlert("🚨 LIMITE DE INFRAÇÕES EXCEDIDO! EXPLOSÃO IMEDIATA!");
      endGame('LOSE');
    } else {
      setStrikeAlert(`🚨 STRIKE ${nextStrikes}/3: ${msg} [Relógio Acelerado!]`);
      setTimeRemaining((prev) => Math.max(0, prev - 30)); // Remove 30 segundos punitivos imediatos
    }
  };

  const renderModule = (id) => {
    if (solvedModules.includes(id)) {
      return (
        <div style={{ ...styles.moduleCard, borderColor: '#00ff66' }} key={id}>
          <div style={styles.moduleHeader}>MÓDULO 0{id} <span style={styles.ledGreen}></span></div>
          <p style={{ color: '#00ff66', textAlign: 'center', padding: '20px' }}>✓ INTEGRALIZADO EM COMPLIANCE</p>
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
          <div>SISTEMA CRÍTICO DE GOVERNANÇA GTI v6.0-HARDCORE</div>
          <div>EPIC_SANDBOX // MULTI_STRIKE_ENABLED</div>
        </header>

        {gameState === 'START' && (
          <div style={styles.centerScreen}>
            <h1 style={styles.glitchTitle}>PROJECT: KEEP TALK GTI</h1>
            <p style={styles.subtitle}>COBIT & ITIL Crisis Simulation Sandbox</p>
            <button style={styles.retroButton} onClick={() => setGameState('TEAM_INPUT')}>
              INICIAR PROTOCOLO DE CRISE (JOGAR)
            </button>
          </div>
        )}

        {gameState === 'TEAM_INPUT' && (
          <div style={styles.centerScreen}>
            <h2>CADASTRO DE OPERADORES DE TI</h2>
            <form onSubmit={handleTeamSubmit} style={styles.form}>
              <label style={styles.label}>IDENTIFICAÇÃO DA EQUIPE:</label>
              <input 
                type="text" 
                style={styles.retroInput} 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Ex: GRUPO_05_GTI"
                required
              />
              <button type="submit" style={styles.retroButton}>GERAR ELEMENTOS RANDÔMICOS</button>
            </form>
          </div>
        )}

        {gameState === 'MANUAL_QR' && (
          <div style={styles.centerScreen}>
            <h2>MANUAL DE GOVERNANÇA LIBERADO (COBIT/ITIL)</h2>
            <p style={{ color: '#ffd700', marginBottom: '20px' }}>
              O Comitê de Governança deve escanear o QR Code para ler as regras de contingência.
            </p>
            <div style={styles.qrContainer}>
              <img src={QR_CODE_API} alt="QR Code" style={styles.qrCode} />
            </div>
            <p style={styles.codeText}>Módulos Armados nesta rodada: {activeModuleIds.map(id => `[Mód 0${id}] `)}</p>
            <button style={styles.retroButton} onClick={startBomb}>
              ENTENDIDO. ENTRAR NO PAINEL DA BOMBA!
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div style={styles.gameGrid}>
            <div style={styles.sidebar}>
              <div style={styles.panelTitle}>STATUS DA CRISE</div>
              <div style={{ ...styles.countdown, color: timeRemaining < 60 ? '#ff0055' : '#00ff66' }}>
                {formatTime(timeRemaining)}
              </div>
              
              {/* Painel de Exibição de Erros Dinâmicos (Strikes) */}
              <div style={styles.strikeContainer}>
                <span style={{ color: '#aaa', fontSize: '12px' }}>STRIKES: </span>
                <span style={{ color: strikes > 0 ? '#ff0055' : '#333', fontSize: '22px', fontWeight: 'bold' }}>X </span>
                <span style={{ color: strikes > 1 ? '#ff0055' : '#333', fontSize: '22px', fontWeight: 'bold' }}>X </span>
                <span style={{ color: strikes > 2 ? '#ff0055' : '#333', fontSize: '22px', fontWeight: 'bold' }}>X</span>
              </div>

              {/* Variáveis Físicas Fundamentais da Rodada */}
              <div style={styles.hardwarePanel}>
                <div style={styles.hardwareHeader}>HARDWARE ATIVO</div>
                <p><strong>SERIAL NO:</strong> <span style={{color: '#ffd700'}}>{serialNumber}</span></p>
                <p><strong>BATERIAS BACKUP:</strong> <span style={{color: '#ffd700'}}>{batteriesCount} UN</span></p>
              </div>

              <div style={styles.metaData}>
                <p><strong>EQUIPE:</strong> {teamName}</p>
                <p><strong>CONCLUÍDOS:</strong> {solvedModules.length} / 3</p>
                {getTimeSpeedMultiplier() > 1 && (
                  <p style={{color: '#ff0055', fontWeight: 'bold'}}>⚠️ VELOCIDADE: {getTimeSpeedMultiplier()}x</p>
                )}
              </div>
              {strikeAlert && <div style={styles.alertText}>{strikeAlert}</div>}
            </div>

            <div style={styles.modulesContainer}>
              {activeModuleIds.map(id => renderModule(id))}
            </div>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div style={styles.centerScreen}>
            {gameResult === 'WIN' ? (
              <>
                <h1 style={{...styles.glitchTitle, color: '#00ff66'}}>CRISE MITIGADA!</h1>
                <div style={styles.scoreBox}>
                  <p><strong>EQUIPE:</strong> {teamName.toUpperCase()}</p>
                  <p><strong>TEMPO DE RESPOSTA:</strong> {formatTime(finalTime)}</p>
                  <p><strong>POLÍTICA DE ERROS:</strong> {strikes} Strike(s) cometidos</p>
                </div>
              </>
            ) : (
              <>
                <h1 style={{...styles.glitchTitle, color: '#ff0055'}}>SISTEMA EXPLODIDO!</h1>
                <p style={styles.subtitle}>A infraestrutura colapsou ou a ANPD aplicou sanções de encerramento compulsório.</p>
              </>
            )}
            <button style={styles.retroButton} onClick={() => setGameState('START')}>REINICIAR</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// FOLHA DE ESTILOS MAXIMALISTA RETRÔ
// ==========================================
const styles = {
  bodyContainer: { backgroundColor: '#0a0a0a', color: '#00ff66', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  retroTerminal: { width: '100%', maxWidth: '1200px', backgroundColor: '#121212', border: '4px solid #333', padding: '20px', position: 'relative' },
  terminalHeader: { display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed #333', paddingBottom: '10px', marginBottom: '20px', fontSize: '12px', color: '#888' },
  centerScreen: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 10px' },
  glitchTitle: { fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 10px 0', textShadow: '3px 3px #ff0055' },
  subtitle: { fontSize: '14px', color: '#ffd700', marginBottom: '30px' },
  retroButton: { backgroundColor: '#00ff66', color: '#000', border: 'none', padding: '15px 30px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '4px 4px 0px #ffd700' },
  form: { display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px', gap: '10px' },
  label: { color: '#fff', textAlign: 'left' },
  retroInput: { backgroundColor: '#000', border: '2px solid #ffd700', color: '#ffd700', padding: '12px', fontFamily: 'monospace' },
  retroInputClean: { backgroundColor: '#000', border: '1px solid #00ff66', color: '#00ff66', padding: '8px', fontFamily: 'monospace', flex: 1 },
  qrContainer: { backgroundColor: '#fff', padding: '10px', border: '4px solid #ffd700', marginBottom: '20px' },
  qrCode: { display: 'block' },
  codeText: { color: '#ffd700', margin: '20px 0' },
  gameGrid: { display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' },
  sidebar: { backgroundColor: '#000', border: '2px solid #333', padding: '15px' },
  panelTitle: { backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', padding: '5px', textAlign: 'center' },
  countdown: { fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', marginTop: '10px', marginBottom: '5px' },
  strikeContainer: { textAlign: 'center', padding: '5px', borderBottom: '1px solid #222', marginBottom: '15px' },
  hardwarePanel: { backgroundColor: '#111', border: '1px dashed #ffd700', padding: '10px', marginBottom: '15px', fontSize: '12px' },
  hardwareHeader: { color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #333', paddingBottom: '3px', marginBottom: '5px' },
  metaData: { borderTop: '1px solid #333', paddingTop: '10px', fontSize: '12px', color: '#aaa' },
  modulesContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
  moduleCard: { backgroundColor: '#151515', border: '2px solid #ff0055', padding: '15px' },
  moduleHeader: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '10px' },
  moduleDesc: { fontSize: '13px', color: '#ccc', marginBottom: '15px' },
  radioGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' },
  radioLabel: { color: '#ffd700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' },
  moduleBtn: { backgroundColor: '#ffd700', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' },
  alertText: { marginTop: '20px', padding: '10px', backgroundColor: '#220005', borderLeft: '3px solid #ff0055', fontSize: '12px' },
  ledGreen: { width: '12px', height: '12px', backgroundColor: '#00ff66', borderRadius: '50%', display: 'inline-block' },
  fakeChart: { display: 'flex', alignItems: 'flex-end', gap: '10px', height: '60px', backgroundColor: '#000', padding: '10px', marginBottom: '15px' },
  chartBar: { width: '30%', backgroundColor: '#ffd700', transition: 'height 0.3s' },
  retroTable: { width: '100%', borderCollapse: 'collapse', marginBottom: '15px', fontSize: '12px' },
  tableBtn: { backgroundColor: '#333', color: '#00ff66', border: '1px solid #00ff66', padding: '2px 8px', cursor: 'pointer' },
  codeSnippet: { backgroundColor: '#000', padding: '10px', border: '1px dashed #ffd700', color: '#00ff66', marginBottom: '15px', fontSize: '12px' },
  inlineForm: { display: 'flex', gap: '10px' },
  sessionRow: { display: 'flex', justifyContent: 'space-between', padding: '5px', backgroundColor: '#000', marginBottom: '5px', fontSize: '11px' },
  keypadContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  keypadDisplay: { backgroundColor: '#000', border: '2px solid #ff0055', color: '#ff0055', fontSize: '20px', padding: '5px 20px', width: '100px', textAlign: 'center', letterSpacing: '4px' },
  keypadGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' },
  keyBtn: { backgroundColor: '#222', color: '#fff', border: '1px solid #444', padding: '10px', cursor: 'pointer', fontWeight: 'bold' },
  scoreBox: { border: '2px dashed #00ff66', padding: '20px', backgroundColor: '#000', margin: '20px 0', textAlign: 'left' }
};