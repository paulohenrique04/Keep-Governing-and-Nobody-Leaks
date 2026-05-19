import { useState, useEffect } from 'react';

// Link fictício do Google Drive para o manual (substitua pelo seu link real se quiser)
const MANUAL_DRIVE_URL = "https://drive.google.com/file/d/YOUR_MANUAL_ID/view";
const QR_CODE_API = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(MANUAL_DRIVE_URL)}`;

export default function App() {
  // Estados do Fluxo do Jogo
  const [gameState, setGameState] = useState('START'); // START, TEAM_INPUT, MANUAL_QR, PLAYING, GAME_OVER
  const [teamName, setTeamName] = useState('');
  const [gameResult, setGameResult] = useState(null); // 'WIN' ou 'LOSE'
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutos de pânico
  const [finalTime, setFinalTime] = useState(0);

  // Estados dos Módulos (Painel do Operador - ITIL)
  // Módulo 1: DSS05 + Gestão de Incidentes (Vazamento de dados ativos)
  const [m1Status, setM1Status] = useState('PENDING'); // PENDING, SOLVED
  const [m1Action, setM1Action] = useState(null); // 'ISOLAR' ou 'PATCH'
  const [m1Alert, setM1Alert] = useState('');

  // Módulo 2: APO12 + Service Desk (Colapso de Chamados / Dados de Crianças)
  const [m2Status, setM2Status] = useState('PENDING');
  const [m2Tickets, setM2Tickets] = useState(4850);
  const [m2Action, setM2Action] = useState(null); // 'OCULTAR' ou 'NOTIFICAR'
  const [m2Alert, setM2Alert] = useState('');

  // Módulo 3: MEA03 + Gestão de Mudanças (O PIN de Conformidade da LGPD)
  const [m3Status, setM3Status] = useState('PENDING');
  const [m3PinInput, setM3PinInput] = useState('');
  const [m3Alert, setM3Alert] = useState('');

  // Cronômetro
  useEffect(() => {
    let timer;
    if (gameState === 'PLAYING' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame('LOSE');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeRemaining]);

  // Efeito caótico para simular chamados aumentando no Módulo 2
  useEffect(() => {
    let ticketInterval;
    if (gameState === 'PLAYING' && m2Status === 'PENDING') {
      ticketInterval = setInterval(() => {
        setM2Tickets((prev) => prev + Math.floor(Math.random() * 45) + 10);
      }, 800);
    }
    return () => clearInterval(ticketInterval);
  }, [gameState, m2Status]);

  // Auxiliar de formatação do tempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startGameFlow = () => setGameState('TEAM_INPUT');
  
  const handleTeamSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim()) setGameState('MANUAL_QR');
  };

  const startBomb = () => {
    setTimeRemaining(300);
    setM1Status('PENDING');
    setM2Status('PENDING');
    setM3Status('PENDING');
    setM1Alert('');
    setM2Alert('');
    setM3Alert('');
    setM3PinInput('');
    setGameState('PLAYING');
  };

  const endGame = (result) => {
    setFinalTime(300 - timeRemaining);
    setGameResult(result);
    setGameState('GAME_OVER');
  };

  // Checagem de vitória geral
  useEffect(() => {
    if (gameState === 'PLAYING' && m1Status === 'SOLVED' && m2Status === 'SOLVED' && m3Status === 'SOLVED') {
      endGame('WIN');
    }
  }, [m1Status, m2Status, m3Status, gameState]);

  // Lógica Módulo 1: DSS05 (Contenção precede mudança)
  const handleM1Execute = () => {
    if (!m1Action) {
      setM1Alert("ERRO: NENHUMA AÇÃO SELECIONADA.");
      return;
    }
    if (m1Action === 'PATCH') {
      // Falhou! O ITIL tentou aplicar o patch direto sem a regra de governança do COBIT
      setM1Alert("🔥 CRASH! Você aplicou o patch mas o invasor usou a mesma porta para vazar mais dados! COBIT DSS05 exige contenção primeiro.");
      setTimeRemaining((prev) => Math.max(0, prev - 45)); // Penalidade de tempo
    } else if (m1Action === 'ISOLAR') {
      setM1Status('SOLVED');
      setM1Alert("✓ SUCESSO: Servidores isolados conforme COBIT DSS05. Incidente contido.");
    }
  };

  // Lógica Módulo 2: APO12 (Transparência vs Multa LGPD)
  const handleM2Execute = () => {
    if (!m2Action) {
      setM2Alert("ERRO: NENHUMA AÇÃO SELECIONADA.");
      return;
    }
    if (m2Action === 'OCULTAR') {
      setM2Alert("🚨 MULTA MÁXIMA DA LGPD! Tentar omitir vazamento de dados de menores violou o APO12 do COBIT.");
      setTimeRemaining((prev) => Math.max(0, prev - 60)); // Penalidade pesada
    } else if (m2Action === 'NOTIFICAR') {
      setM2Status('SOLVED');
      setM2Alert("✓ SUCESSO: Service Desk instruído a notificar ANPD e usuários. Risco gerenciado.");
    }
  };

  // Lógica Módulo 3: MEA03 (PIN de validação de Conformidade)
  // No seu manual do comitê, você pode inventar uma regra matemática. Ex: "O PIN é a soma do ano da LGPD (2018) com o número do módulo MEA (03) = 2021"
  const handleM3Verify = (e) => {
    e.preventDefault();
    if (m3PinInput === '2021') {
      setM3Status('SOLVED');
      setM3Alert("✓ SUCESSO: PIN de conformidade MEA03 aceito. Mudança autorizada na produção!");
    } else {
      setM3Alert("❌ PIN INVÁLIDO: Auditoria do COBIT rejeitou a mudança.");
      setTimeRemaining((prev) => Math.max(0, prev - 30));
    }
  };

  return (
    <div style={styles.bodyContainer}>
      <div style={styles.retroTerminal}>
        
        {/* HEADER CORPORATIVO RETRÔ */}
        <header style={styles.terminalHeader}>
          <div>SISTEMA CRÍTICO DE MITIGAÇÃO DE CRISE v4.02</div>
          <div>EPIC_GAMES_INC // SECURE_LINE</div>
        </header>

        {/* 1. TELA INICIAL */}
        {gameState === 'START' && (
          <div style={styles.centerScreen}>
            <h1 style={styles.glitchTitle}>PROJECT: KEEP</h1>
            <p style={styles.subtitle}>COBIT & ITIL Crisis Simulation Sandbox</p>
            <div style={styles.warningBox}>
              [ALERTA]: INVASÃO DETECTADA NOS SERVIDORES DA EPIC GAMES. DADOS DE USUÁRIOS EXPOSTOS.
            </div>
            <button style={styles.retroButton} onClick={startGameFlow}>
              INICIAR PROTOCOLO DE CRISE (JOGAR)
            </button>
          </div>
        )}

        {/* 2. ENTRADA DA DUPLA */}
        {gameState === 'TEAM_INPUT' && (
          <div style={styles.centerScreen}>
            <h2>CADASTRO DE OPERADORES DE TI</h2>
            <form onSubmit={handleTeamSubmit} style={styles.form}>
              <label style={styles.label}>IDENTIFICAÇÃO DA DUPLA / EQUIPE:</label>
              <input 
                type="text" 
                style={styles.retroInput} 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Ex: GRUPO_05_GTI"
                required
              />
              <button type="submit" style={styles.retroButton}>GERAR MANUAL DA FASE</button>
            </form>
          </div>
        )}

        {/* 3. TELA DO QR CODE DO MANUAL */}
        {gameState === 'MANUAL_QR' && (
          <div style={styles.centerScreen}>
            <h2>MANUAL DE GOVERNANÇA LIBERADO (COBIT)</h2>
            <p style={{ color: '#ffd700', marginBottom: '20px' }}>
              O Comitê de Governança deve escanear o QR Code abaixo para acessar o Manual de Crise.
              O Operador do Painel NÃO deve olhar o manual.
            </p>
            
            <div style={styles.qrContainer}>
              <img src={QR_CODE_API} alt="QR Code para o Manual" style={styles.qrCode} />
              <div style={styles.qrScanLine}></div>
            </div>

            <p style={styles.codeText}>OPERADOR: {teamName.toUpperCase()}</p>
            <button style={styles.retroButton} onClick={startBomb}>
              ENTENDIDO. ENTRAR NO PAINEL DA BOMBA!
            </button>
          </div>
        )}

        {/* 4. O JOGO RODANDO (A BOMBA) */}
        {gameState === 'PLAYING' && (
          <div style={styles.gameGrid}>
            
            {/* SIDEBAR DO CRONÔMETRO */}
            <div style={styles.sidebar}>
              <div style={styles.panelTitle}>STATUS DA CRISE</div>
              <div style={{ ...styles.countdown, color: timeRemaining < 60 ? '#ff0055' : '#00ff66' }}>
                {formatTime(timeRemaining)}
              </div>
              <div style={styles.metaData}>
                <p><strong>ALVO:</strong> Epic Games</p>
                <p><strong>EQUIPE:</strong> {teamName}</p>
                <p><strong>AMBIENTE:</strong> PRODUÇÃO</p>
              </div>
              <div style={styles.systemLogs}>
                <div style={{color: '#ff0055'}}>&gt; [LOG] Vazamento ativo.</div>
                <div style={{color: '#ffd700'}}>&gt; [LOG] Governança exige compliance.</div>
                {m1Status === 'SOLVED' && <div style={{color: '#00ff66'}}>&gt; [LOG] DSS05 Concluído.</div>}
                {m2Status === 'SOLVED' && <div style={{color: '#00ff66'}}>&gt; [LOG] APO12 Concluído.</div>}
              </div>
            </div>

            {/* PAINEL DOS MÓDULOS DE TI (ITIL) */}
            <div style={styles.modulesContainer}>
              
              {/* MÓDULO 1 */}
              <div style={{...styles.moduleCard, borderColor: m1Status === 'SOLVED' ? '#00ff66' : '#ff0055'}}>
                <div style={styles.moduleHeader}>
                  <span>MOD_01: GESTÃO DE INCIDENTES (ITIL)</span>
                  <span style={m1Status === 'SOLVED' ? styles.ledGreen : styles.ledRed}></span>
                </div>
                <p style={styles.moduleDesc}>Sintoma: Invasor extraindo banco de dados de contas ativas agora.</p>
                
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="m1" 
                      disabled={m1Status === 'SOLVED'}
                      onChange={() => setM1Action('PATCH')} 
                    /> Deploy Imediato de Hot-Fix/Patch no Servidor.
                  </label>
                  <label style={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="m1" 
                      disabled={m1Status === 'SOLVED'}
                      onChange={() => setM1Action('ISOLAR')} 
                    /> Isolar o segmento de rede afetado e derrubar a rota externa.
                  </label>
                </div>

                <button 
                  style={m1Status === 'SOLVED' ? styles.disabledBtn : styles.moduleBtn} 
                  disabled={m1Status === 'SOLVED'}
                  onClick={handleM1Execute}
                >
                  EXECUTAR AÇÃO TÉCNICA
                </button>
                {m1Alert && <p style={styles.alertText}>{m1Alert}</p>}
              </div>

              {/* MÓDULO 2 */}
              <div style={{...styles.moduleCard, borderColor: m2Status === 'SOLVED' ? '#00ff66' : '#ff0055'}}>
                <div style={styles.moduleHeader}>
                  <span>MOD_02: SERVICE DESK & RISCO (ITIL/COBIT)</span>
                  <span style={m2Status === 'SOLVED' ? styles.ledGreen : styles.ledRed}></span>
                </div>
                <p style={styles.moduleDesc}>Crise: {m2Tickets} chamados pendentes. Suspeita de vazamento de dados de crianças (Forte impacto LGPD).</p>
                
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="m2" 
                      disabled={m2Status === 'SOLVED'}
                      onChange={() => setM2Action('OCULTAR')} 
                    /> Forçar modo privado no painel para diminuir chamados e reter informação.
                  </label>
                  <label style={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="m2" 
                      disabled={m2Status === 'SOLVED'}
                      onChange={() => setM2Action('NOTIFICAR')} 
                    /> Iniciar Transparência: Disparar comunicados oficiais de risco aos responsáveis.
                  </label>
                </div>

                <button 
                  style={m2Status === 'SOLVED' ? styles.disabledBtn : styles.moduleBtn} 
                  disabled={m2Status === 'SOLVED'}
                  onClick={handleM2Execute}
                >
                  APLICAR DIRETRIZ
                </button>
                {m2Alert && <p style={styles.alertText}>{m2Alert}</p>}
              </div>

              {/* MÓDULO 3 */}
              <div style={{...styles.moduleCard, borderColor: m3Status === 'SOLVED' ? '#00ff66' : '#ff0055'}}>
                <div style={styles.moduleHeader}>
                  <span>MOD_03: GESTÃO DE MUDANÇAS & COMPLIANCE</span>
                  <span style={m3Status === 'SOLVED' ? styles.ledGreen : styles.ledRed}></span>
                </div>
                <p style={styles.moduleDesc}>Validação: O patch final está compilado pelo ITIL. Insira o PIN de validação do MEA03 presente no Manual do COBIT para autorizar a mudança em Produção.</p>
                
                <form onSubmit={m3Status === 'SOLVED' ? (e)=>e.preventDefault() : handleM3Verify} style={styles.inlineForm}>
                  <input 
                    type="text" 
                    placeholder="PIN COBIT" 
                    style={styles.pinInput}
                    value={m3PinInput}
                    disabled={m3Status === 'SOLVED'}
                    onChange={(e) => setM3PinInput(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    style={m3Status === 'SOLVED' ? styles.disabledBtn : styles.moduleBtn}
                    disabled={m3Status === 'SOLVED'}
                  >
                    AUTORIZAR MUDANÇA
                  </button>
                </form>
                {m3Alert && <p style={styles.alertText}>{m3Alert}</p>}
              </div>

            </div>
          </div>
        )}

        {/* 5. TELA DE FIM DE JOGO */}
        {gameState === 'GAME_OVER' && (
          <div style={styles.centerScreen}>
            {gameResult === 'WIN' ? (
              <>
                <h1 style={{...styles.glitchTitle, color: '#00ff66'}}>CRISE MITIGADA!</h1>
                <p style={styles.subtitle}>Governança e Gestão agiram em perfeita sincronia.</p>
                <div style={styles.scoreBox}>
                  <p><strong>EQUIPE:</strong> {teamName.toUpperCase()}</p>
                  <p><strong>TEMPO DE RESPOSTA:</strong> {formatTime(finalTime)}</p>
                  <p><strong>RESULTADO:</strong> SUCESSO COMPATÍVEL COM LGPD</p>
                </div>
              </>
            ) : (
              <>
                <h1 style={{...styles.glitchTitle, color: '#ff0055'}}>SISTEMA CORROMPIDO!</h1>
                <p style={styles.subtitle}>A infraestrutura colapsou ou a ANPD aplicou sanções fatais.</p>
                <div style={{...styles.scoreBox, borderColor: '#ff0055'}}>
                  <p><strong>EQUIPE:</strong> {teamName.toUpperCase()}</p>
                  <p><strong>STATUS:</strong> FALÊNCIA OPERACIONAL / MULTA LGPD</p>
                </div>
              </>
            )}
            <button style={styles.retroButton} onClick={() => setGameState('START')}>
              REINICIAR SIMULAÇÃO
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ARQUITETURA CSS MAXIMALISTA RETRÔ-CORPORATIVA (CSS-in-JS inline para portabilidade rápida)
const styles = {
  bodyContainer: {
    backgroundColor: '#0a0a0a',
    color: '#00ff66',
    fontFamily: '"Courier New", Courier, monospace',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  retroTerminal: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: '#121212',
    border: '4px solid #333',
    boxShadow: '0 0 30px rgba(0, 255, 102, 0.15), inset 0 0 20px rgba(0,0,0,0.9)',
    padding: '20px',
    position: 'relative',
  },
  terminalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '2px dashed #333',
    paddingBottom: '10px',
    marginBottom: '20px',
    fontSize: '12px',
    color: '#888',
  },
  centerScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 10px',
  },
  glitchTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    letterSpacing: '5px',
    margin: '0 0 10px 0',
    color: '#00ff66',
    textShadow: '3px 3px #ff0055',
  },
  subtitle: {
    fontSize: '16px',
    color: '#ffd700',
    marginBottom: '30px',
    textTransform: 'uppercase',
  },
  warningBox: {
    border: '2px solid #ff0055',
    backgroundColor: 'rgba(255,0,85,0.1)',
    color: '#ff0055',
    padding: '15px',
    marginBottom: '30px',
    fontWeight: 'bold',
    maxWidth: '600px',
  },
  retroButton: {
    backgroundColor: '#00ff66',
    color: '#000',
    border: 'none',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: '"Courier New", Courier, monospace',
    boxShadow: '4px 4px 0px #ffd700',
    textTransform: 'uppercase',
    transition: 'all 0.2s',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    marginBottom: '10px',
    color: '#fff',
    fontWeight: 'bold',
  },
  retroInput: {
    width: '100%',
    backgroundColor: '#000',
    border: '2px solid #ffd700',
    color: '#ffd700',
    padding: '12px',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '16px',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
  qrContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '15px',
    border: '4px solid #ffd700',
    marginBottom: '20px',
    display: 'inline-block',
  },
  qrCode: {
    display: 'block',
  },
  qrScanLine: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '4px',
    backgroundColor: '#ff0055',
    animation: 'scan 2s linear infinite',
  },
  codeText: {
    color: '#888',
    marginBottom: '30px',
  },
  gameGrid: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '20px',
  },
  sidebar: {
    backgroundColor: '#000',
    border: '2px solid #333',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  panelTitle: {
    color: '#000',
    backgroundColor: '#ffd700',
    fontWeight: 'bold',
    padding: '5px',
    textAlign: 'center',
    fontSize: '14px',
    marginBottom: '15px',
  },
  countdown: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
    margin: '10px 0',
    textShadow: '0 0 10px currentColor',
  },
  metaData: {
    borderTop: '1px solid #333',
    paddingTop: '10px',
    fontSize: '12px',
    color: '#aaa',
    lineHeight: '1.6',
  },
  systemLogs: {
    marginTop: 'auto',
    backgroundColor: '#050505',
    border: '1px solid #222',
    padding: '10px',
    height: '120px',
    fontSize: '11px',
    overflowY: 'hidden',
    fontFamily: 'monospace',
  },
  modulesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  moduleCard: {
    backgroundColor: '#151515',
    border: '2px solid',
    padding: '15px',
    position: 'relative',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
  },
  moduleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    borderBottom: '1px solid #333',
    paddingBottom: '5px',
    marginBottom: '10px',
    color: '#fff',
  },
  ledRed: {
    width: '12px',
    height: '12px',
    backgroundColor: '#ff0055',
    borderRadius: '50%',
    boxShadow: '0 0 8px #ff0055',
  },
  ledGreen: {
    width: '12px',
    height: '12px',
    backgroundColor: '#00ff66',
    borderRadius: '50%',
    boxShadow: '0 0 8px #00ff66',
  },
  moduleDesc: {
    fontSize: '13px',
    color: '#ccc',
    marginBottom: '15px',
    lineHeight: '1.4',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
  },
  radioLabel: {
    fontSize: '13px',
    color: '#ffd700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  moduleBtn: {
    backgroundColor: '#ffd700',
    color: '#000',
    border: 'none',
    padding: '10px 20px',
    fontFamily: '"Courier New", Courier, monospace',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  disabledBtn: {
    backgroundColor: '#333',
    color: '#666',
    border: 'none',
    padding: '10px 20px',
    fontFamily: '"Courier New", Courier, monospace',
    fontWeight: 'bold',
    cursor: 'not-allowed',
    textTransform: 'uppercase',
  },
  alertText: {
    marginTop: '10px',
    fontSize: '12px',
    lineHeight: '1.4',
    padding: '5px',
    backgroundColor: '#000',
    borderLeft: '3px solid #ff0055',
  },
  inlineForm: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  pinInput: {
    backgroundColor: '#000',
    border: '2px solid #ff0055',
    color: '#ff0055',
    padding: '8px',
    fontSize: '14px',
    fontFamily: '"Courier New", Courier, monospace',
    width: '120px',
    textAlign: 'center',
  },
  scoreBox: {
    border: '2px dashed #00ff66',
    padding: '20px',
    backgroundColor: '#000',
    textAlign: 'left',
    minWidth: '300px',
    marginBottom: '30px',
    lineHeight: '1.8',
  }
};