'use client';

import { useState, useEffect } from 'react';

// Types
interface Commitment {
  id: string;
  user_name: string;
  commitment_text: string;
  commitment_type: string;
  original_stake: number;
  stake_remaining: number;
  penalty_per_failure: number;
  commitment_start_date: string;
  commitment_end_date: string;
  commitment_duration: number;
  status: string;
  judge_name: string;
  judge_phone: string;
  phone: string;
}

interface Judge {
  id: string;
  phone: string;
  consent_status: string;
  user_id: string;
  users?: {
    user_name: string;
    commitment_text: string;
  };
}

interface DailyLog {
  id: string;
  date: string;
  outcome: string;
  user_id: string;
}

interface SMSLog {
  id: number;
  direction: 'inbound' | 'outbound';
  from: string;
  to: string;
  text: string;
  time: string;
}

export default function Dashboard() {
  const [page, setPage] = useState<'dashboard' | 'commitments' | 'judges' | 'sms'>('dashboard');
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [judges, setJudges] = useState<Judge[]>([]);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [smsLog, setSmsLog] = useState<SMSLog[]>([]);
  const [userPhone, setUserPhone] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [showCommitmentModal, setShowCommitmentModal] = useState(false);
  const [smsInput, setSmsInput] = useState('');
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  // Form state
  const [newCommitment, setNewCommitment] = useState({
    goal: '',
    stake: '',
    duration: '',
    type: 'daily',
    judgeName: '',
    judgePhone: ''
  });

  // Show toast
  const showToast = (message: string, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Auth flow
  const sendCode = async () => {
    try {
      const res = await fetch('/api/dashboard/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: userPhone })
      });
      if (res.ok) {
        setCodeSent(true);
        showToast('Code sent!');
      } else {
        showToast('Failed to send code', 'error');
      }
    } catch (e) {
      showToast('Error sending code', 'error');
    }
  };

  const verifyCode = async () => {
    try {
      const res = await fetch('/api/dashboard/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: userPhone, code: verificationCode })
      });
      if (res.ok) {
        const data = await res.json();
        setCommitments(data.commitments || []);
        setJudges(data.judges || []);
        setLogs(data.logs || []);
        setIsAuthenticated(true);
        generateSMSLog(data.commitments, data.logs);
        showToast('Welcome back!');
      } else {
        showToast('Invalid code', 'error');
      }
    } catch (e) {
      showToast('Error verifying', 'error');
    }
  };

  const generateSMSLog = (comms: Commitment[], dailyLogs: DailyLog[]) => {
    const log: SMSLog[] = [];
    let id = 1;
    
    comms.forEach(c => {
      log.push({
        id: id++,
        direction: 'outbound',
        from: 'Cheengu',
        to: c.judge_name || c.judge_phone,
        text: `${c.user_name} wants you to be their accountability partner.\n\nGoal: "${c.commitment_text}"\nStake: $${c.original_stake}\n\nReply ACCEPT or DECLINE.`,
        time: new Date(c.commitment_start_date).toLocaleDateString()
      });
      
      if (c.status === 'active' || c.status === 'completed') {
        log.push({
          id: id++,
          direction: 'inbound',
          from: c.judge_name || 'Judge',
          to: 'Cheengu',
          text: 'ACCEPT',
          time: new Date(c.commitment_start_date).toLocaleDateString()
        });
      }
    });
    
    dailyLogs.forEach(l => {
      const comm = comms.find(c => c.id === l.user_id);
      if (comm && l.outcome !== 'pending') {
        log.push({
          id: id++,
          direction: 'inbound',
          from: comm.judge_name || 'Judge',
          to: 'Cheengu',
          text: l.outcome === 'pass' ? 'YES' : 'NO',
          time: l.date
        });
      }
    });
    
    setSmsLog(log.slice(-20));
  };

  // Stats
  const activeCommitments = commitments.filter(c => c.status === 'active');
  const failedDays = logs.filter(l => l.outcome === 'fail').length;
  const passedDays = logs.filter(l => l.outcome === 'pass').length;
  const totalStaked = activeCommitments.reduce((sum, c) => sum + c.original_stake, 0);
  const totalLost = commitments.reduce((sum, c) => sum + (c.original_stake - c.stake_remaining), 0);
  const successRate = passedDays + failedDays > 0 
    ? Math.round((passedDays / (passedDays + failedDays)) * 100) 
    : null;

  // Simulate SMS
  const simulateSMS = () => {
    if (!smsInput.trim()) return;
    
    const sender = judges[0]?.users?.user_name || 'Judge';
    setSmsLog(prev => [...prev, {
      id: prev.length + 1,
      direction: 'inbound',
      from: sender,
      to: 'Cheengu',
      text: smsInput,
      time: 'Just now'
    }]);
    
    const upper = smsInput.toUpperCase();
    let response = "Got your message. Reply YES, NO, STATUS, or STOP.";
    
    if (upper === 'YES') response = "✓ Logged as success.";
    else if (upper === 'NO') response = "Noted. Marked as missed.";
    else if (upper === 'STATUS') response = `${activeCommitments.length} active commitment(s).`;
    
    setTimeout(() => {
      setSmsLog(prev => [...prev, {
        id: prev.length + 1,
        direction: 'outbound',
        from: 'Cheengu',
        to: sender,
        text: response,
        time: 'Just now'
      }]);
    }, 500);
    
    setSmsInput('');
  };

  // Auth screen
  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">cheengu</h1>
          <p className="auth-sub">Enter your phone to access your dashboard</p>
          
          {!codeSent ? (
            <>
              <input
                type="tel"
                placeholder="+1 555 000 0000"
                value={userPhone}
                onChange={e => setUserPhone(e.target.value)}
                className="input"
              />
              <button onClick={sendCode} className="btn-primary full">
                Send Code
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter 4-digit code"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
                className="input"
                maxLength={4}
              />
              <button onClick={verifyCode} className="btn-primary full">
                Verify
              </button>
            </>
          )}
        </div>
        
        {toast && (
          <div className={`toast ${toast.type}`}>{toast.message}</div>
        )}
        
        <style jsx>{`
          .auth-container {
            min-height: 100vh;
            background: #0c0c0e;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: 'DM Mono', monospace;
          }
          .auth-card {
            background: #141416;
            border: 1px solid #2a2a30;
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 360px;
            text-align: center;
          }
          .auth-title {
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 32px;
            color: #e8ff5a;
            margin-bottom: 8px;
          }
          .auth-sub {
            color: #9090a0;
            font-size: 13px;
            margin-bottom: 24px;
          }
          .input {
            width: 100%;
            background: #0c0c0e;
            border: 1px solid #2a2a30;
            border-radius: 8px;
            padding: 12px 14px;
            font-size: 13px;
            color: #f0f0f5;
            margin-bottom: 12px;
            outline: none;
          }
          .input:focus { border-color: #e8ff5a; }
          .btn-primary {
            background: #e8ff5a;
            color: #000;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 13px;
          }
          .btn-primary:hover { background: #d4eb50; }
          .full { width: 100%; }
          .toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #141416;
            border: 1px solid #2a2a30;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 13px;
            color: #f0f0f5;
          }
          .toast.success { border-color: rgba(79,255,145,0.4); }
          .toast.error { border-color: rgba(255,79,79,0.4); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">cheengu</div>
          <div className="logo-tag">ACCOUNTABILITY</div>
        </div>
        
        <nav className="nav">
          {(['dashboard', 'commitments', 'judges', 'sms'] as const).map(p => (
            <div
              key={p}
              onClick={() => setPage(p)}
              className={`nav-item ${page === p ? 'active' : ''}`}
            >
              <span className="nav-icon">
                {p === 'dashboard' ? '◈' : p === 'commitments' ? '◉' : p === 'judges' ? '◎' : '◈'}
              </span>
              <span>{p.charAt(0).toUpperCase() + p.slice(1)}</span>
            </div>
          ))}
        </nav>
        
        <div className="sidebar-bottom">
          <div className="user-chip">
            <div className="avatar">
              {commitments[0]?.user_name?.[0] || 'U'}
            </div>
            <div className="user-info">
              <div className="user-name">{commitments[0]?.user_name || 'User'}</div>
              <div className="user-phone">{userPhone.slice(-4)}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        
        {/* Dashboard Page */}
        {page === 'dashboard' && (
          <div>
            <div className="page-header">
              <h1 className="page-title">
                Good {new Date().getHours() < 12 ? 'morning' : 'evening'}, {commitments[0]?.user_name || 'there'}.
              </h1>
              <p className="page-sub">
                {activeCommitments.length} active commitment{activeCommitments.length !== 1 ? 's' : ''}. Stay sharp.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">TOTAL STAKED</div>
                <div className="stat-value accent">${totalStaked}</div>
                <div className="stat-meta">across active commitments</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">SUCCESS RATE</div>
                <div className="stat-value green">
                  {successRate !== null ? `${successRate}%` : '—'}
                </div>
                <div className="stat-meta">all-time</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">ACTIVE NOW</div>
                <div className="stat-value">{activeCommitments.length}</div>
                <div className="stat-meta">commitments running</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">OWED TO JUDGES</div>
                <div className="stat-value red">${totalLost}</div>
                <div className="stat-meta">settle up via Venmo</div>
              </div>
            </div>

            {/* Active Commitments */}
            <div className="section-header">
              <h2 className="section-title">Active Commitments</h2>
              <button onClick={() => setShowCommitmentModal(true)} className="btn-primary">
                + New Commitment
              </button>
            </div>

            <div className="commitments-list">
              {activeCommitments.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">◌</div>
                  <div>No active commitments. Text START to Cheengu.</div>
                </div>
              ) : (
                activeCommitments.map(c => (
                  <CommitmentCard key={c.id} commitment={c} logs={logs} />
                ))
              )}
            </div>

            {/* SMS Preview */}
            <div className="section-header" style={{marginTop: 32}}>
              <h2 className="section-title">Recent SMS Activity</h2>
              <div className="live-dot">● live</div>
            </div>
            <div className="sms-feed">
              {smsLog.slice(-3).map(msg => (
                <SMSMessage key={msg.id} msg={msg} />
              ))}
            </div>
          </div>
        )}

        {/* Commitments Page */}
        {page === 'commitments' && (
          <div>
            <div className="page-header">
              <h1 className="page-title">Commitments</h1>
              <p className="page-sub">Every one costs you something. That's the point.</p>
            </div>
            
            <div className="section-header">
              <h2 className="section-title">All Commitments</h2>
              <button onClick={() => setShowCommitmentModal(true)} className="btn-primary">
                + New Commitment
              </button>
            </div>

            <div className="commitments-list">
              {commitments.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">◌</div>
                  <div>No commitments yet. Text START to Cheengu.</div>
                </div>
              ) : (
                commitments.map(c => (
                  <CommitmentCard key={c.id} commitment={c} logs={logs} />
                ))
              )}
            </div>
          </div>
        )}

        {/* Judges Page */}
        {page === 'judges' && (
          <div>
            <div className="page-header">
              <h1 className="page-title">Judges</h1>
              <p className="page-sub">The humans who keep you honest.</p>
            </div>

            <div className="judges-list">
              {commitments.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">◌</div>
                  <div>No judges yet.</div>
                </div>
              ) : (
                // Get unique judges from commitments
                [...new Map(commitments.map(c => [c.judge_phone, c])).values()].map(c => (
                  <div key={c.judge_phone} className="judge-card">
                    <div className="judge-avatar">
                      {(c.judge_name || c.judge_phone)[0]}
                    </div>
                    <div className="judge-info">
                      <div className="judge-name">{c.judge_name || 'Judge'}</div>
                      <div className="judge-phone">{c.judge_phone}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SMS Log Page */}
        {page === 'sms' && (
          <div>
            <div className="page-header">
              <h1 className="page-title">SMS Log</h1>
              <p className="page-sub">All messages sent and received.</p>
            </div>

            <div className="sms-full-feed">
              <div className="sms-header">
                <span className="sms-title">Message Thread</span>
                <span className="live-dot">● Connected</span>
              </div>
              
              <div className="sms-messages">
                {smsLog.map(msg => (
                  <SMSMessage key={msg.id} msg={msg} />
                ))}
              </div>
              
              <div className="sms-composer">
                <input
                  type="text"
                  placeholder="Simulate SMS (YES, NO, STATUS)..."
                  value={smsInput}
                  onChange={e => setSmsInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && simulateSMS()}
                  className="sms-input"
                />
                <button onClick={simulateSMS} className="sms-send-btn">↑</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success' ? '✓ ' : '✗ '}{toast.message}
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'DM Mono', monospace;
          background: #0c0c0e;
          color: #f0f0f5;
        }
        
        .app {
          display: flex;
          min-height: 100vh;
        }
        
        .sidebar {
          width: 240px;
          background: #141416;
          border-right: 1px solid #2a2a30;
          display: flex;
          flex-direction: column;
          padding: 28px 0;
        }
        
        .logo {
          padding: 0 24px 28px;
          border-bottom: 1px solid #2a2a30;
          margin-bottom: 24px;
        }
        
        .logo-mark {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #e8ff5a;
        }
        
        .logo-tag {
          font-size: 10px;
          color: #5a5a6a;
          letter-spacing: 1.5px;
          margin-top: 2px;
        }
        
        .nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 0 12px;
          flex: 1;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #9090a0;
          cursor: pointer;
          transition: all 0.15s;
        }
        
        .nav-item:hover {
          background: #1c1c20;
          color: #f0f0f5;
        }
        
        .nav-item.active {
          background: rgba(232,255,90,0.12);
          color: #e8ff5a;
          border: 1px solid rgba(232,255,90,0.25);
        }
        
        .nav-icon { font-size: 16px; width: 20px; text-align: center; }
        
        .sidebar-bottom {
          padding: 16px 24px 0;
          border-top: 1px solid #2a2a30;
        }
        
        .user-chip {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e8ff5a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          color: #000;
        }
        
        .user-name { color: #f0f0f5; font-weight: 500; font-size: 11px; }
        .user-phone { color: #5a5a6a; font-size: 10px; margin-top: 1px; }
        
        .main {
          flex: 1;
          overflow-y: auto;
          padding: 40px 48px;
        }
        
        .page-header { margin-bottom: 40px; }
        
        .page-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 32px;
          letter-spacing: -1px;
          margin-bottom: 6px;
        }
        
        .page-sub { color: #9090a0; font-size: 13px; }
        
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background: #141416;
          border: 1px solid #2a2a30;
          border-radius: 12px;
          padding: 20px;
        }
        
        .stat-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          color: #5a5a6a;
          margin-bottom: 10px;
        }
        
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 28px;
          color: #f0f0f5;
          letter-spacing: -1px;
        }
        
        .stat-value.accent { color: #e8ff5a; }
        .stat-value.green { color: #4fff91; }
        .stat-value.red { color: #ff4f4f; }
        
        .stat-meta { font-size: 11px; color: #5a5a6a; margin-top: 4px; }
        
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 16px;
        }
        
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background: #e8ff5a;
          color: #000;
          border: none;
          font-family: 'DM Mono', monospace;
        }
        
        .btn-primary:hover { background: #d4eb50; }
        
        .commitments-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .commitment-card {
          background: #141416;
          border: 1px solid #2a2a30;
          border-left: 3px solid #e8ff5a;
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          gap: 20px;
          align-items: center;
        }
        
        .commitment-card.complete { border-left-color: #4fff91; }
        .commitment-card.failed { border-left-color: #ff4f4f; }
        
        .commitment-main { flex: 1; }
        
        .commitment-title {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 6px;
        }
        
        .commitment-meta {
          display: flex;
          gap: 16px;
          font-size: 11px;
          color: #9090a0;
        }
        
        .commitment-meta .judge { color: #e8ff5a; }
        
        .progress-bar {
          height: 3px;
          background: #2a2a30;
          border-radius: 2px;
          margin-top: 10px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 2px;
          background: #e8ff5a;
          transition: width 0.5s ease;
        }
        
        .commitment-right { text-align: right; }
        
        .stake-badge {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #f0f0f5;
        }
        
        .status-pill {
          display: inline-block;
          font-size: 10px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          margin-top: 8px;
        }
        
        .status-pill.active {
          background: rgba(232,255,90,0.12);
          color: #e8ff5a;
        }
        
        .status-pill.completed {
          background: rgba(79,255,145,0.12);
          color: #4fff91;
        }
        
        .empty {
          text-align: center;
          padding: 60px 20px;
          color: #5a5a6a;
        }
        
        .empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
        
        .live-dot { font-size: 11px; color: #4fff91; }
        
        .sms-feed, .sms-full-feed {
          background: #141416;
          border: 1px solid #2a2a30;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .sms-feed { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        
        .sms-header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a30;
          display: flex;
          justify-content: space-between;
        }
        
        .sms-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
        }
        
        .sms-messages {
          max-height: 400px;
          overflow-y: auto;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .sms-msg { display: flex; gap: 12px; }
        
        .sms-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #1c1c20;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }
        
        .sms-avatar.outbound {
          background: rgba(232,255,90,0.12);
          color: #e8ff5a;
        }
        
        .sms-sender { font-size: 10px; color: #5a5a6a; margin-bottom: 4px; }
        
        .sms-text {
          font-size: 13px;
          background: #1c1c20;
          padding: 10px 14px;
          border-radius: 10px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        
        .sms-msg.outbound .sms-text {
          background: rgba(232,255,90,0.12);
          border: 1px solid rgba(232,255,90,0.25);
        }
        
        .sms-time { font-size: 10px; color: #5a5a6a; margin-top: 4px; }
        
        .sms-composer {
          padding: 14px 20px;
          border-top: 1px solid #2a2a30;
          display: flex;
          gap: 10px;
        }
        
        .sms-input {
          flex: 1;
          background: #1c1c20;
          border: 1px solid #2a2a30;
          border-radius: 20px;
          padding: 10px 16px;
          font-size: 12px;
          color: #f0f0f5;
          outline: none;
          font-family: 'DM Mono', monospace;
        }
        
        .sms-input:focus { border-color: #e8ff5a; }
        
        .sms-send-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e8ff5a;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
        
        .judge-card {
          background: #141416;
          border: 1px solid #2a2a30;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .judge-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(232,255,90,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          color: #e8ff5a;
        }
        
        .judge-name {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 3px;
        }
        
        .judge-phone { font-size: 12px; color: #5a5a6a; }
        
        .toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #141416;
          border: 1px solid #2a2a30;
          border-radius: 10px;
          padding: 14px 18px;
          font-size: 13px;
          color: #f0f0f5;
          z-index: 200;
          animation: slideUp 0.3s ease;
        }
        
        .toast.success { border-color: rgba(79,255,145,0.4); }
        .toast.error { border-color: rgba(255,79,79,0.4); }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 900px) {
          .sidebar { width: 60px; }
          .logo-mark, .logo-tag, .nav-item span, .user-info { display: none; }
          .nav-item { justify-content: center; }
          .main { padding: 24px 20px; }
          .stats-row { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}

// Commitment Card Component
function CommitmentCard({ commitment: c, logs }: { commitment: Commitment; logs: DailyLog[] }) {
  const startDate = new Date(c.commitment_start_date);
  const today = new Date();
  const elapsed = Math.max(0, Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const progress = Math.min(100, Math.round((elapsed / c.commitment_duration) * 100));
  
  const userLogs = logs.filter(l => l.user_id === c.id);
  const failures = userLogs.filter(l => l.outcome === 'fail').length;
  
  return (
    <div className={`commitment-card ${c.status}`}>
      <div className="commitment-main">
        <h3 className="commitment-title">{c.commitment_text}</h3>
        <div className="commitment-meta">
          <span>⏱ {c.commitment_duration}d</span>
          <span className="judge">⚖ {c.judge_name || c.judge_phone}</span>
          <span>{c.commitment_type}</span>
          {failures > 0 && <span style={{color: '#ff4f4f'}}>✗ {failures} miss</span>}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{
              width: `${progress}%`,
              background: c.status === 'completed' ? '#4fff91' : c.status === 'failed' ? '#ff4f4f' : '#e8ff5a'
            }} 
          />
        </div>
      </div>
      <div className="commitment-right">
        <div className="stake-badge">${c.stake_remaining}</div>
        <div style={{fontSize: 10, color: '#5a5a6a'}}>of ${c.original_stake}</div>
        <span className={`status-pill ${c.status}`}>{c.status}</span>
      </div>
    </div>
  );
}

// SMS Message Component  
function SMSMessage({ msg }: { msg: SMSLog }) {
  const isOutbound = msg.direction === 'outbound';
  
  return (
    <div className={`sms-msg ${isOutbound ? 'outbound' : ''}`}>
      <div className={`sms-avatar ${isOutbound ? 'outbound' : ''}`}>
        {isOutbound ? '⚡' : msg.from[0]}
      </div>
      <div>
        <div className="sms-sender">
          {isOutbound ? `Cheengu → ${msg.to}` : `${msg.from} → Cheengu`}
        </div>
        <div className="sms-text">{msg.text}</div>
        <div className="sms-time">{msg.time}</div>
      </div>
    </div>
  );
}