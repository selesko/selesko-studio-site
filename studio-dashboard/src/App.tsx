import React, { useState } from 'react';
import { LayoutGrid, Archive, Box, Users, BookOpen, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  { id: 1, title: 'Atelier Villette', phase: 'Mental', location: 'Mooe', lastActivity: '02 + month', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Moss Residence', phase: 'Mental', location: 'Mooe', lastActivity: '02 + month', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Canyon View', phase: 'Mental', location: 'Mooe', lastActivity: '02 + month', image: 'https://images.unsplash.com/photo-1449156001935-d2863547658d?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Nordic Retreat', phase: 'Mental', location: 'Mooe', lastActivity: '02 + month', image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Desert Pavilion', phase: 'Mental', location: 'Mooe', lastActivity: '02 + month', image: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Urban Vineyard', phase: 'Mental', location: 'Mooe', lastActivity: '15 + month', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
];

const SPRINT_STEPS = [
  { id: 'intake', label: 'Intake Interrogator', status: 'completed', progress: 100 },
  { id: 'weaver', label: 'Narrative Weaver', status: 'active', progress: 74 },
  { id: 'prompter', label: 'Image Prompter', status: 'upcoming', progress: 0 },
  { id: 'archivist', label: 'Archivist', status: 'upcoming', progress: 0 },
];

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Selesko</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Studio Site</p>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <NavItem active={activeTab === 'overview'} icon={<LayoutGrid size={20} />} label="Overview" onClick={() => setActiveTab('overview')} />
          <NavItem active={activeTab === 'projects'} icon={<Archive size={20} />} label="Projects" onClick={() => setActiveTab('projects')} />
          <NavItem active={activeTab === 'archive'} icon={<Box size={20} />} label="Archive" onClick={() => setActiveTab('archive')} />
          <NavItem active={activeTab === 'team'} icon={<Users size={20} />} label="Team" onClick={() => setActiveTab('team')} />
          <NavItem active={activeTab === 'resources'} icon={<BookOpen size={20} />} label="Resources" onClick={() => setActiveTab('resources')} />
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <h3 style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 700 }}>Current Sprint</h3>
          {SPRINT_STEPS.map((step) => (
            <div key={step.id} className={`status-step ${step.status}`}>
              {step.status === 'completed' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{step.label}</div>
                {step.status === 'active' && (
                  <div className="progress-bar">
                    <motion.div 
                      className="progress-fill" 
                      initial={{ width: 0 }}
                      animate={{ width: `${step.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '1.5rem' }}>Creative Engine</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Jeff Goldblatt</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead Architect</p>
            </div>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" style={{ width: 40, height: 40, borderRadius: '50%' }} />
          </div>
        </header>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Collection</h2>
            <button style={{ background: 'var(--accent)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>Gallery</button>
          </div>

          <div className="tectonic-grid">
            <AnimatePresence>
              {PROJECTS.map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card"
                >
                  <img src={project.image} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: '8px', marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phase</p>
                      <p style={{ margin: 0, fontSize: '0.7rem' }}>{project.phase}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Location</p>
                      <p style={{ margin: 0, fontSize: '0.7rem' }}>{project.location}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Activity</p>
                      <p style={{ margin: 0, fontSize: '0.7rem' }}>{project.lastActivity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <div 
      className={`nav-item ${active ? 'active' : ''}`} 
      onClick={onClick}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        padding: '0.8rem 1rem', 
        borderRadius: '8px', 
        cursor: 'pointer',
        color: active ? 'white' : 'var(--text-muted)',
        background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        marginBottom: '0.2rem',
        transition: 'all 0.2s ease'
      }}
    >
      {icon}
      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{label}</span>
      {active && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
    </div>
  );
}

export default App;
