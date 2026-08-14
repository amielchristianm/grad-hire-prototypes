import { useState, type ReactNode } from 'react'
import { Link, Outlet, createRootRoute, createRoute, createRouter, useNavigate, useRouterState } from '@tanstack/react-router'
import {
  ArrowDownRight, ArrowUpRight, Bell, Bot, CalendarDays, Check, ChevronRight,
  CircleHelp, Clock3, Download, FileSpreadsheet, Filter, Gauge, Inbox, LayoutDashboard, Lightbulb,
  ListChecks, MessageSquare, MoreHorizontal, Plus, Search, Settings2, Sparkles, Target, Timer,
  TrendingUp, Users, WandSparkles, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, initials } from '@/lib/utils'

type Icon = typeof LayoutDashboard

const navigation: { label: string; to: '/' | '/attendance' | '/automation-finder' | '/queue-health' | '/interruptions' | '/retrospective' | '/watcher'; icon: Icon; color?: string }[] = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Attendance monitor', to: '/attendance', icon: CalendarDays, color: 'text-[#db765c]' },
  { label: 'Automation finder', to: '/automation-finder', icon: WandSparkles, color: 'text-[#8069c1]' },
  { label: 'Queue health', to: '/queue-health', icon: Gauge, color: 'text-[#d8973e]' },
  { label: 'Interruptions', to: '/interruptions', icon: Bell, color: 'text-[#4b8f83]' },
  { label: 'Retrospective+', to: '/retrospective', icon: Sparkles, color: 'text-[#c96986]' },
  { label: 'The Watcher', to: '/watcher', icon: Target, color: 'text-[#4f83b2]' },
]

function AppShell() {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const currentPath = routerState.location.pathname
  const [globalMessage, setGlobalMessage] = useState('')
  const current = navigation.find((item) => currentPath === item.to || currentPath.startsWith(item.to + '/')) ?? navigation[0]

  return (
    <div className="min-h-screen bg-[#f6f7f4]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] flex-col bg-[#1e2b2d] px-4 py-5 text-[#eaf0e9] lg:flex">
        <Link to="/" className="mb-10 flex items-center gap-3 px-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#d9f0df] text-[#1e2b2d]"><Zap className="h-4 w-4 fill-current" /></div>
          <div><div className="font-display text-base font-bold tracking-tight">Team Signals</div><div className="text-[10px] uppercase tracking-[.18em] text-[#9dafaa]">prototype suite</div></div>
        </Link>
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#8da19a]">Workspace</div>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const IconComponent = item.icon
            const active = currentPath === item.to || currentPath.startsWith(item.to + '/')
            return <Link key={item.to} to={item.to} className={cn('group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition', active ? 'bg-[#d9f0df] text-[#1e2b2d]' : 'text-[#afc0b9] hover:bg-[#2b3a3b] hover:text-white')}><IconComponent className={cn('h-4 w-4', active ? 'text-[#2b765a]' : item.color)} /><span>{item.label}</span>{active && <ChevronRight className="ml-auto h-3.5 w-3.5" />}</Link>
          })}
        </nav>
        <div className="mt-auto space-y-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#d7e3dc]"><CircleHelp className="h-4 w-4 text-[#badfc5]" /> Prototype note</div><p className="text-xs leading-5 text-[#93a9a0]">A shared workspace for testing better ways to see how work moves.</p></div>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#efb88e] text-xs font-bold text-[#56372d]">AM</div><div className="min-w-0"><div className="truncate text-sm font-semibold">Amiel M.</div><div className="truncate text-xs text-[#91a39b]">Product design</div></div><Settings2 className="ml-auto h-4 w-4 text-[#91a39b]" /></div>
        </div>
      </aside>
      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-[#e5e8e1] bg-[#f6f7f4]/90 px-5 backdrop-blur lg:px-10">
          <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#1e2b2d] text-[#d9f0df] lg:hidden"><Zap className="h-4 w-4 fill-current" /></div><div><div className="text-xs font-medium text-muted-foreground">Prototype workspace /</div><div className="font-display text-sm font-bold">{current.label}</div></div></div>
          <div className="flex items-center gap-2"><Button onClick={() => void navigate({ to: '/retrospective/history' })} aria-label="Search prototype history" variant="ghost" size="icon" className="hidden text-muted-foreground sm:inline-flex"><Search className="h-4 w-4" /></Button><Button onClick={() => setGlobalMessage('You are all caught up—no new prototype alerts.')} aria-label="Show notifications" variant="ghost" size="icon" className="hidden text-muted-foreground sm:inline-flex"><Bell className="h-4 w-4" /></Button><div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-[#efb88e] text-xs font-bold text-[#56372d]">AM</div></div>
        </header>
        <main className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10"><Feedback message={globalMessage} /><Outlet /></main>
      </div>
    </div>
  )
}


function downloadTextFile(filename: string, content: string, mimeType = 'text/plain') {
  if (typeof document === 'undefined') return
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function csvValue(value: string | number) {
  return '"' + String(value).replace(/"/g, '""') + '"'
}

function Feedback({ message }: { message: string }) {
  if (!message) return null
  return <div role="status" className="mb-5 rounded-xl border border-[#cce5d4] bg-[#e8f5ed] px-4 py-3 text-sm font-medium text-[#39745a]">{message}</div>
}

function formatEntryDate(value: string) {
  return new Date(value + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatDuration(minutes: number) {
  return Math.floor(minutes / 60) + 'h ' + String(minutes % 60).padStart(2, '0') + 'm'
}

function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#4b8f83]"><span className="h-1.5 w-1.5 rounded-full bg-[#4b8f83]" />{eyebrow}</div><h1 className="font-display text-3xl font-bold tracking-[-.04em] text-[#1e2b2d] sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p></div>{action}</div>
}

function StatCard({ label, value, note, trend, icon: IconComponent, tone = 'green' }: { label: string; value: string; note: string; trend?: 'up' | 'down'; icon: Icon; tone?: 'green' | 'violet' | 'orange' | 'blue' }) {
  const tones = { green: 'bg-[#e3f3e8] text-[#28775b]', violet: 'bg-[#eee9ff] text-[#705bb1]', orange: 'bg-[#fff0d9] text-[#a56b26]', blue: 'bg-[#e4f0fa] text-[#4c7fa5]' }
  return <Card className="overflow-hidden"><CardContent className="p-5"><div className="flex items-start justify-between"><div className={cn('grid h-9 w-9 place-items-center rounded-xl', tones[tone])}><IconComponent className="h-4 w-4" /></div>{trend && <div className={cn('flex items-center gap-1 text-xs font-bold', trend === 'up' ? 'text-[#3b8b65]' : 'text-[#bf6655')}>{trend === 'up' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />} {note}</div>}</div><div className="mt-6 font-display text-2xl font-bold tracking-tight">{value}</div><div className="mt-1 text-xs text-muted-foreground">{trend ? label : `${label} · ${note}`}</div></CardContent></Card>
}

function Avatar({ name, className }: { name: string; className?: string }) { return <div title={name} className={cn('grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#d9e8e0] text-[10px] font-bold text-[#2d6250]', className)}>{initials(name)}</div> }

function Overview() {
  const prototypes = [
    { title: 'Attendance monitor', description: 'A friendly time log that still speaks fluent HR spreadsheet.', to: '/attendance' as const, icon: CalendarDays, tint: 'bg-[#fff0ea]', iconColor: 'text-[#d66b52]', status: 'Ready to explore', metric: '18 / 20 days logged' },
    { title: 'Automation finder', description: 'Turn repetitive work into a visible pipeline of opportunities.', to: '/automation-finder' as const, icon: WandSparkles, tint: 'bg-[#f0ebff]', iconColor: 'text-[#775db4]', status: 'MVP ready', metric: '42.5 hrs / month found' },
    { title: 'Queue health', description: 'A pulse check for personal backlog before it becomes invisible stress.', to: '/queue-health' as const, icon: Gauge, tint: 'bg-[#fff3df]', iconColor: 'text-[#be7a29]', status: 'MVP ready', metric: 'Healthy queue' },
    { title: 'Interruptions', description: 'Make the hidden cost of context switching visible and actionable.', to: '/interruptions' as const, icon: Bell, tint: 'bg-[#e8f5f1]', iconColor: 'text-[#3e8174]', status: 'MVP ready', metric: '7 interruptions today' },
    { title: 'Retrospective+', description: 'Remember what teams forgot, spot recurring problems, and follow through.', to: '/retrospective' as const, icon: Sparkles, tint: 'bg-[#fbeaf0]', iconColor: 'text-[#be5d78]', status: 'Intelligence layer', metric: '6 recurring themes' },
    { title: 'The Watcher', description: 'A lightweight evidence trail for contributions and better conversations.', to: '/watcher' as const, icon: Target, tint: 'bg-[#e8f1f9]', iconColor: 'text-[#4b7fa8]', status: 'Capstone concept', metric: '12 contributions logged' },
  ]
  return <div><div className="mb-8 grid-paper overflow-hidden rounded-[28px] border border-[#dbe5de] bg-[#eaf4ed] p-6 sm:p-10"><div className="max-w-3xl"><Badge variant="success" className="mb-5">PRODUCT EXPLORATION · 06 PROTOTYPES</Badge><h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-.05em] text-[#1e2b2d] sm:text-6xl">See the work behind the work.</h1><p className="mt-5 max-w-xl text-base leading-7 text-[#536c61]">Team Signals is a small collection of focused workplace tools—designed to make invisible effort, friction, and progress easier to understand.</p><div className="mt-7 flex flex-wrap gap-3"><Link to="/retrospective"><Button variant="default" size="lg">Explore the flagship <ChevronRight className="h-4 w-4" /></Button></Link><Button onClick={() => downloadTextFile('team-signals-brief.txt', 'Team Signals brief\n\nSix focused workplace prototypes for making invisible work easier to understand.')} variant="outline" size="lg" className="bg-white/60"><FileSpreadsheet className="h-4 w-4" /> Read the brief</Button></div></div><div className="mt-10 flex items-end gap-3 sm:mt-0 sm:ml-auto sm:w-[40%]"><div className="h-32 w-1/3 rounded-t-[20px] bg-[#b8d9c2]" /><div className="h-48 w-1/3 rounded-t-[20px] bg-[#6fa68b]" /><div className="h-40 w-1/3 rounded-t-[20px] bg-[#2f6754]" /></div></div>
    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Signals captured" value="128" note="this month" icon={Inbox} tone="green" /><StatCard label="Automation potential" value="42.5 hrs" note="+18%" trend="up" icon={WandSparkles} tone="violet" /><StatCard label="Team focus time" value="68%" note="-6%" trend="down" icon={Timer} tone="orange" /><StatCard label="Open actions" value="12" note="across 4 sprints" icon={ListChecks} tone="blue" /></div>
    <div className="mb-4 flex items-end justify-between"><div><h2 className="font-display text-xl font-bold tracking-tight">Prototype runway</h2><p className="mt-1 text-sm text-muted-foreground">Each idea is intentionally small enough to test in a week.</p></div><Badge variant="outline" className="hidden sm:inline-flex">Internal · v0.1</Badge></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{prototypes.map((prototype) => { const IconComponent = prototype.icon; return <Link key={prototype.to} to={prototype.to} className="group"><Card className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:shadow-lg"><CardContent className="flex h-full flex-col p-5"><div className="flex items-start justify-between"><div className={cn('grid h-11 w-11 place-items-center rounded-2xl', prototype.tint, prototype.iconColor)}><IconComponent className="h-5 w-5" /></div><ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" /></div><div className="mt-6 flex-1"><h3 className="font-display text-lg font-bold">{prototype.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{prototype.description}</p></div><div className="mt-6 flex items-center justify-between border-t border-border pt-4"><span className="text-xs font-semibold text-[#456f5e]">{prototype.metric}</span><span className="text-[11px] text-muted-foreground">{prototype.status}</span></div></CardContent></Card></Link> })}</div>
  </div>
}

type AttendanceFilter = 'all' | 'pending' | 'approved' | 'draft'
type AttendanceEntry = { date: string; shift: string; hours: string; night: string; status: string; note?: string }
function AttendancePage() {
  const [entries, setEntries] = useState<AttendanceEntry[]>([
    { date: 'Mon, 10 Jun', shift: '09:00 – 18:00', hours: '8h 00m', night: '—', status: 'Approved' },
    { date: 'Tue, 11 Jun', shift: '09:12 – 18:04', hours: '7h 52m', night: '—', status: 'Approved' },
    { date: 'Wed, 12 Jun', shift: '14:00 – 23:00', hours: '8h 00m', night: '1h 00m', status: 'Pending' },
    { date: 'Thu, 13 Jun', shift: '14:05 – 23:10', hours: '8h 05m', night: '1h 10m', status: 'Pending' },
  ])
  const [note, setNote] = useState('')
  const [entryDate, setEntryDate] = useState('2024-06-14')
  const [shift, setShift] = useState('Regular shift')
  const [filter, setFilter] = useState<AttendanceFilter>('all')
  const [showAll, setShowAll] = useState(false)
  const [feedback, setFeedback] = useState('')

  const filteredEntries = entries.filter((entry) => filter === 'all' || entry.status.toLowerCase() === filter)
  const visibleEntries = showAll ? filteredEntries : filteredEntries.slice(0, 4)
  const filterLabel = filter === 'all' ? 'All entries' : filter[0].toUpperCase() + filter.slice(1)

  const addEntry = () => {
    if (!note.trim()) {
      setFeedback('Add a short note before saving this attendance draft.')
      return
    }
    const night = shift === 'Night shift' ? '1h 00m' : '—'
    setEntries((current) => [...current, { date: formatEntryDate(entryDate), shift: shift === 'Regular shift' ? '09:00 – 18:00' : shift === 'Night shift' ? '14:00 – 23:00' : '09:00 – 19:00', hours: '8h 00m', night, status: 'Draft', note }])
    setNote('')
    setFeedback('Attendance draft saved. Review it before submitting.')
  }

  const exportAttendance = () => {
    const rows = entries.map((entry) => [entry.date, entry.shift, entry.hours, entry.night, entry.status, entry.note ?? ''])
    downloadTextFile('attendance-export.csv', [['Date', 'Shift', 'Net hours', 'Night differential', 'Status', 'Notes'], ...rows].map((row) => row.map(csvValue).join(',')).join('\n'), 'text/csv')
    setFeedback('Attendance export downloaded as a spreadsheet-ready CSV.')
  }

  const cycleFilter = () => setFilter((current) => current === 'all' ? 'pending' : current === 'pending' ? 'approved' : current === 'approved' ? 'draft' : 'all')

  return <div><PageIntro eyebrow="Prototype 01 / Attendance" title="Attendance, without the spreadsheet maze." description="A guided time log for employees that keeps HR's familiar Excel output in the background—not in the way." action={<div className="flex gap-2"><Button onClick={exportAttendance} variant="outline"><Download className="h-4 w-4" /> Export Excel</Button><Button onClick={() => document.getElementById('attendance-note')?.focus()} variant="coral"><Plus className="h-4 w-4" /> Log attendance</Button></div>} /><Feedback message={feedback} /><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Pay period" value={entries.length + ' / 20'} note="days logged" icon={CalendarDays} tone="green" /><StatCard label="Pending review" value={String(entries.filter((entry) => entry.status === 'Pending').length)} note="entries" icon={Clock3} tone="orange" /><StatCard label="Night differential" value="14h 20m" note="this period" icon={Timer} tone="violet" /><StatCard label="Log accuracy" value="98%" note="+4%" trend="up" icon={Check} tone="blue" /></div><div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]"><Card><CardHeader className="flex-row items-start justify-between"><div><CardTitle>June 1 – 15, 2024</CardTitle><CardDescription>IT Apps Manila · first half attendance report</CardDescription></div><Button onClick={cycleFilter} variant="ghost" size="sm"><Filter className="h-4 w-4" /> {filterLabel}</Button></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="border-b border-border text-xs text-muted-foreground"><tr><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Shift</th><th className="pb-3 font-medium">Net hours</th><th className="pb-3 font-medium">Night diff.</th><th className="pb-3 font-medium">Status</th></tr></thead><tbody>{visibleEntries.map((entry, index) => <tr key={entry.date + index} className="border-b border-border last:border-0"><td className="py-4 font-semibold">{entry.date}</td><td className="py-4 text-muted-foreground">{entry.shift}</td><td className="py-4">{entry.hours}</td><td className="py-4">{entry.night}</td><td className="py-4"><Badge variant={entry.status === 'Approved' ? 'success' : entry.status === 'Pending' ? 'warning' : 'violet'}>{entry.status}</Badge></td></tr>)}</tbody></table></div></CardContent><CardFooter className="justify-between border-t border-border pt-4"><span className="text-xs text-muted-foreground">Showing {visibleEntries.length} of {filteredEntries.length} matching entries</span><Button onClick={() => setShowAll((current) => !current)} variant="ghost" size="sm">{showAll ? 'Show less' : 'View all'} <ChevronRight className="h-3.5 w-3.5" /></Button></CardFooter></Card><div className="space-y-5"><Card className="bg-[#1e2b2d] text-white"><CardHeader><div className="flex items-center gap-2 text-[#b9e2c6]"><Sparkles className="h-4 w-4" /><span className="text-xs font-bold uppercase tracking-[.15em]">Quick log</span></div><CardTitle className="mt-2 text-white">What did your day look like?</CardTitle><CardDescription className="text-[#a8bbb2]">Add a note and we’ll help structure the details.</CardDescription></CardHeader><CardContent className="space-y-3"><div className="grid grid-cols-2 gap-3"><Input className="border-white/10 bg-white/10 text-white placeholder:text-[#9eb1a8]" type="date" value={entryDate} onChange={(event) => setEntryDate(event.target.value)} /><select value={shift} onChange={(event) => setShift(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-white/10 px-3 text-sm text-white outline-none"><option className="text-black">Regular shift</option><option className="text-black">Night shift</option><option className="text-black">Overtime</option></select></div><Textarea id="attendance-note" value={note} onChange={(event) => setNote(event.target.value)} className="border-white/10 bg-white/10 text-white placeholder:text-[#9eb1a8]" placeholder="e.g. Worked on release support and UAT handoff" /><Button onClick={addEntry} variant="soft" className="w-full">Save draft <Check className="h-4 w-4" /></Button></CardContent></Card><Card><CardContent className="p-5"><div className="flex gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#fff0ea] text-[#d66b52]"><FileSpreadsheet className="h-5 w-5" /></div><div><h3 className="font-display font-bold">HR-ready when you need it</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">Export the same 35-column structure HR expects, with comments and night differential details mapped automatically.</p></div></div></CardContent></Card></div></div></div>
}

type Opportunity = { name: string; team: string; hours: string; score: number; status: string }
function AutomationPage() {
  const [task, setTask] = useState('')
  const [minutes, setMinutes] = useState('30')
  const [frequency, setFrequency] = useState('8')
  const [details, setDetails] = useState('')
  const [filter, setFilter] = useState<'all' | 'high'>('all')
  const [feedback, setFeedback] = useState('')
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    { name: 'Weekly status report compilation', team: 'Delivery', hours: '12.0 hrs', score: 92, status: 'High potential' },
    { name: 'Copying release notes into tickets', team: 'Engineering', hours: '8.5 hrs', score: 78, status: 'Worth exploring' },
    { name: 'Manual access request follow-up', team: 'Operations', hours: '6.0 hrs', score: 64, status: 'Worth exploring' },
  ])

  const addTask = () => {
    if (!task.trim()) {
      setFeedback('Describe the repetitive task before adding an opportunity.')
      return
    }
    const monthlyHours = Math.max(0.5, Number(minutes) * Number(frequency) / 60)
    const score = Math.min(99, 48 + Math.round(monthlyHours * 2.5))
    setOpportunities((items) => [{ name: task.trim(), team: 'My team', hours: monthlyHours.toFixed(1) + ' hrs', score, status: score >= 80 ? 'High potential' : 'New signal' }, ...items])
    setTask('')
    setDetails('')
    setFeedback('Opportunity added with an estimated ROI score of ' + score + '.')
  }

  const visibleOpportunities = opportunities.filter((item) => filter === 'all' || item.score >= 80)
  const potentialHours = opportunities.reduce((sum, item) => sum + Number.parseFloat(item.hours), 0)
  const filterLabel = filter === 'all' ? 'All signals' : 'High potential'

  return <div><PageIntro eyebrow="Prototype 02 / Automation" title="Find the work worth improving." description="A lightweight intake for repetitive work—so teams can build a case for automation with signals, not hunches." action={<Button onClick={() => setFeedback('Score = estimated monthly hours, repeatability, and likely process leverage. It is a conversation starter, not an employee rating.')} variant="soft"><Bot className="h-4 w-4" /> How scoring works</Button>} /><Feedback message={feedback} /><div className="mb-6 grid gap-4 sm:grid-cols-3"><StatCard label="Time found" value={potentialHours.toFixed(1) + ' hrs'} note="per month" icon={Clock3} tone="violet" /><StatCard label="Automation potential" value="76 / 100" note="+18%" trend="up" icon={WandSparkles} tone="green" /><StatCard label="Est. annual value" value="₱612k" note="opportunity pool" icon={TrendingUp} tone="orange" /></div><div className="grid gap-5 xl:grid-cols-[1fr_1.55fr]"><Card className="border-[#e6defb] bg-[#f0ebff]"><CardHeader><Badge variant="violet" className="w-fit">NEW SIGNAL</Badge><CardTitle className="mt-3">What repetitive task slows you down?</CardTitle><CardDescription>Share the task in plain language. The scoring model estimates frequency, effort, and automation potential.</CardDescription></CardHeader><CardContent className="space-y-4"><Input value={task} onChange={(event) => setTask(event.target.value)} placeholder="e.g. Reconciling weekly ticket reports" className="border-[#d9cdf7] bg-white" /><div className="grid grid-cols-2 gap-3"><label className="text-xs font-semibold text-[#6b5a9d]">Minutes each time<Input value={minutes} onChange={(event) => setMinutes(event.target.value)} className="mt-1 border-[#d9cdf7] bg-white" type="number" min="1" /></label><label className="text-xs font-semibold text-[#6b5a9d]">Times per month<Input value={frequency} onChange={(event) => setFrequency(event.target.value)} className="mt-1 border-[#d9cdf7] bg-white" type="number" min="1" /></label></div><label className="text-xs font-semibold text-[#6b5a9d]">What makes it repetitive?<Textarea value={details} onChange={(event) => setDetails(event.target.value)} className="mt-1 border-[#d9cdf7] bg-white" placeholder="Same steps, same sources, same copy-paste..." /></label><Button onClick={addTask} className="w-full bg-[#6e58aa] hover:bg-[#5f4b99]">Add opportunity <Plus className="h-4 w-4" /></Button></CardContent><CardFooter><p className="text-xs leading-5 text-[#766a9a]">You can submit anonymously. Signals are grouped by task type, not by individual performance.</p></CardFooter></Card><Card><CardHeader className="flex-row items-start justify-between"><div><CardTitle>Opportunity pipeline</CardTitle><CardDescription>Where time could be returned to the team</CardDescription></div><Button onClick={() => setFilter((current) => current === 'all' ? 'high' : 'all')} variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> {filterLabel}</Button></CardHeader><CardContent className="space-y-3">{visibleOpportunities.map((item) => <div key={item.name} className="rounded-2xl border border-border p-4"><div className="flex items-start justify-between gap-4"><div><div className="font-semibold">{item.name}</div><div className="mt-1 text-xs text-muted-foreground">{item.team} · {item.hours} recovered monthly</div></div><div className="text-right"><div className="font-display text-lg font-bold text-[#6e58aa]">{item.score}</div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">ROI score</div></div></div><div className="mt-3 flex items-center gap-3"><Progress value={item.score} indicatorClassName="bg-[#8069c1]" /><Badge variant={item.score > 80 ? 'violet' : 'secondary'}>{item.status}</Badge><button title="Remove signal" onClick={() => setOpportunities((current) => current.filter((candidate) => candidate.name !== item.name))} className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button></div></div>)}</CardContent></Card></div></div>
}

type WorkItem = { title: string; area: string; effort: number; priority: 'High' | 'Medium' | 'Low' }
function QueuePage() {
  const [items, setItems] = useState<WorkItem[]>([
    { title: 'Finalize UAT checklist', area: 'Release 24.06', effort: 3, priority: 'High' }, { title: 'Review support handoff', area: 'Operations', effort: 2, priority: 'High' }, { title: 'Update team documentation', area: 'Internal', effort: 4, priority: 'Medium' }, { title: 'Research new reporting API', area: 'Discovery', effort: 5, priority: 'Low' },
  ])
  const [newItem, setNewItem] = useState('')
  const [week, setWeek] = useState<'This week' | 'Next week'>('This week')
  const [feedback, setFeedback] = useState('')
  const score = items.reduce((sum, item) => sum + item.effort * (item.priority === 'High' ? 3 : item.priority === 'Medium' ? 2 : 1), 0)
  const health = score > 32 ? 'Overloaded' : score > 24 ? 'At risk' : 'Healthy'
  const addItem = () => { if (!newItem.trim()) { setFeedback('Name the work item before adding it to the queue.'); return }; setItems((current) => [...current, { title: newItem.trim(), area: 'Inbox', effort: 2, priority: 'Medium' }]); setNewItem(''); setFeedback('Work item added with a medium priority and two-hour estimate.') }
  const cyclePriority = (index: number) => setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, priority: item.priority === 'High' ? 'Medium' : item.priority === 'Medium' ? 'Low' : 'High' } : item))
  const removeItem = (index: number) => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))
  const suggestion = health === 'Overloaded' ? 'Move one high-priority item or ask for help before accepting more work.' : health === 'At risk' ? 'Protect a focus block for the high-priority work before adding more requests.' : 'Your queue has room. Keep new work small enough to finish this week.'

  return <div><PageIntro eyebrow="Prototype 03 / Queue health" title="Know when your queue is asking too much." description="A simple workload check for people who are good at prioritizing—but not always able to see the total load." action={<Button onClick={() => setWeek((current) => current === 'This week' ? 'Next week' : 'This week')} variant="outline"><CalendarDays className="h-4 w-4" /> {week}</Button>} /><Feedback message={feedback} /><div className="mb-6 grid gap-4 sm:grid-cols-3"><Card className={cn('sm:col-span-1', health === 'Healthy' ? 'border-[#cce5d4] bg-[#e8f5ed]' : 'bg-[#fff1df]')}><CardContent className="p-5"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-[#557c68]"><span className="h-2 w-2 rounded-full bg-[#4ca272]" /> Queue status</div><div className="mt-5 font-display text-4xl font-bold tracking-tight">{health}</div><p className="mt-2 text-sm text-muted-foreground">{items.length} open items · {score} workload points</p><Progress value={Math.min(score * 2, 100)} className="mt-5 bg-white" indicatorClassName={health === 'Healthy' ? 'bg-[#4ca272]' : 'bg-[#d8973e]'} /></CardContent></Card><StatCard label="Open work" value={String(items.length)} note="items" icon={Inbox} tone="orange" /><StatCard label="Estimated effort" value={items.reduce((sum, item) => sum + item.effort, 0) + 'h'} note="to clear queue" icon={Timer} tone="blue" /></div><div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]"><Card><CardHeader><CardTitle>My queue</CardTitle><CardDescription>Click the priority badge to cycle it; the score follows the math.</CardDescription></CardHeader><CardContent className="space-y-2">{items.map((item, index) => <div key={item.title + index} className="flex items-center gap-3 rounded-xl border border-border p-3"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#fff3df] text-xs font-bold text-[#a56b26]">{item.effort}h</div><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">{item.title}</div><div className="mt-0.5 text-xs text-muted-foreground">{item.area}</div></div><button onClick={() => cyclePriority(index)} title="Cycle priority"><Badge variant={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'secondary'}>{item.priority}</Badge></button><button onClick={() => removeItem(index)} title="Remove work item" className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button></div>)}</CardContent><CardFooter className="gap-2 border-t border-border pt-4"><Input value={newItem} onChange={(event) => setNewItem(event.target.value)} placeholder="Add a work item..." onKeyDown={(event) => { if (event.key === 'Enter') addItem() }} /><Button onClick={addItem} size="icon"><Plus className="h-4 w-4" /></Button></CardFooter></Card><Card><CardHeader><CardTitle>What the score sees</CardTitle><CardDescription>Not a performance rating—just a conversation starter.</CardDescription></CardHeader><CardContent className="space-y-5"><div><div className="mb-2 flex justify-between text-sm"><span className="font-semibold">Priority mix</span><span className="text-muted-foreground">{items.filter((item) => item.priority === 'High').length} high</span></div><div className="flex h-3 overflow-hidden rounded-full"><div className="bg-[#e77d68]" style={{ width: (items.length ? items.filter((item) => item.priority === 'High').length / items.length * 100 : 0) + '%' }} /><div className="bg-[#e4b66b]" style={{ width: (items.length ? items.filter((item) => item.priority === 'Medium').length / items.length * 100 : 0) + '%' }} /><div className="flex-1 bg-[#b9d6c4]" /></div><div className="mt-2 flex gap-4 text-xs text-muted-foreground"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-[#e77d68]" />High</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-[#e4b66b]" />Medium</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-[#b9d6c4]" />Low</span></div></div><div className="rounded-2xl bg-[#f6f7f4] p-4"><div className="flex gap-3"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#d8973e]" /><p className="text-sm leading-5 text-muted-foreground">{suggestion}</p></div></div><div className="space-y-3 text-sm"><div className="flex items-center justify-between"><span className="text-muted-foreground">Healthy</span><span className="font-semibold">0–24 pts</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">At risk</span><span className="font-semibold">25–32 pts</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Overloaded</span><span className="font-semibold">33+ pts</span></div></div></CardContent></Card></div></div>
}

const interruptionTypes = [{ label: 'Meeting', icon: Users, color: 'bg-[#eee9ff] text-[#705bb1]' }, { label: 'Chat', icon: MessageSquare, color: 'bg-[#e8f5f1] text-[#3e8174]' }, { label: 'Email', icon: Inbox, color: 'bg-[#e4f0fa] text-[#4c7fa5]' }, { label: 'Ad-hoc request', icon: Zap, color: 'bg-[#fff0d9] text-[#a56b26]' }]
function InterruptionsPage() {
  const [logs, setLogs] = useState([{ type: 'Ad-hoc request', time: '10:42', detail: 'Helped unblock a deployment' }, { type: 'Chat', time: '11:18', detail: 'Clarified acceptance criteria' }, { type: 'Meeting', time: '13:00', detail: 'Sprint planning' }, { type: 'Email', time: '15:26', detail: 'Urgent customer follow-up' }])
  const [showAll, setShowAll] = useState(false)
  const [feedback, setFeedback] = useState('')
  const addLog = (type: string) => { setLogs((current) => [{ type, time: 'Now', detail: 'Quick interruption log' }, ...current]); setFeedback(type + ' interruption logged.') }
  const interruptionCount = logs.length + 3
  const focusLost = logs.length * 25 + 30
  const visibleLogs = showAll ? logs : logs.slice(0, 4)
  const exportInsights = () => { const rows = logs.map((log) => [log.time, log.type, log.detail]); downloadTextFile('focus-interruptions.csv', [['Time', 'Type', 'Context'], ...rows].map((row) => row.map(csvValue).join(',')).join('\n'), 'text/csv'); setFeedback('Interruption insights downloaded as a CSV.') }

  return <div><PageIntro eyebrow="Prototype 04 / Focus signals" title="Busy is a feeling. Patterns are data." description="Log the interruptions that break your plan, then use the pattern to protect focus time and plan with more honesty." action={<Button onClick={exportInsights} variant="outline"><Download className="h-4 w-4" /> Export insights</Button>} /><Feedback message={feedback} /><div className="grid gap-5 xl:grid-cols-[.9fr_1.4fr]"><Card className="overflow-hidden bg-[#1e2b2d] text-white"><CardContent className="p-6 sm:p-8"><div className="flex items-center justify-between"><Badge className="border-0 bg-white/10 text-[#cce8d3]">TODAY · WEDNESDAY</Badge><Timer className="h-5 w-5 text-[#b9e2c6]" /></div><div className="mt-12 font-display text-7xl font-bold tracking-[-.08em]">{String(interruptionCount).padStart(2, '0')}</div><div className="mt-2 text-sm text-[#a8bbb2]">interruptions logged</div><div className="mt-8 border-t border-white/10 pt-5"><div className="flex items-center justify-between text-sm"><span className="text-[#a8bbb2]">Estimated focus lost</span><span className="font-semibold">{formatDuration(focusLost)}</span></div><Progress value={Math.min(interruptionCount * 9, 100)} className="mt-3 bg-white/10" indicatorClassName="bg-[#b9e2c6]" /></div></CardContent></Card><Card><CardHeader><CardTitle>Quick log</CardTitle><CardDescription>One tap is enough. Add context later if it helps.</CardDescription></CardHeader><CardContent><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{interruptionTypes.map((type) => { const IconComponent = type.icon; return <button key={type.label} onClick={() => addLog(type.label)} className="group rounded-2xl border border-border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"><div className={cn('grid h-10 w-10 place-items-center rounded-xl', type.color)}><IconComponent className="h-4 w-4" /></div><div className="mt-4 text-sm font-semibold leading-5">{type.label}</div><div className="mt-1 text-xs text-muted-foreground">Tap to log</div></button> })}</div></CardContent></Card></div><div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_1fr]"><Card><CardHeader className="flex-row items-start justify-between"><div><CardTitle>Today's timeline</CardTitle><CardDescription>What pulled your attention away</CardDescription></div><Button onClick={() => setShowAll((current) => !current)} variant="ghost" size="sm">{showAll ? 'Show recent' : 'See all'}</Button></CardHeader><CardContent className="space-y-1">{visibleLogs.map((log, index) => <div key={log.time + index} className="flex gap-4 rounded-xl px-2 py-3 hover:bg-[#f6f7f4]"><div className="w-12 pt-0.5 text-xs font-semibold text-muted-foreground">{log.time}</div><div className="relative flex flex-1 gap-3"><div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4b8f83] ring-4 ring-[#e8f5f1]" /><div><div className="text-sm font-semibold">{log.type}</div><div className="mt-0.5 text-xs text-muted-foreground">{log.detail}</div></div></div></div>)}</CardContent></Card><Card><CardHeader><CardTitle>Interruption patterns</CardTitle><CardDescription>Last 7 working days</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex h-36 items-end gap-2 border-b border-border px-1">{[35, 52, 41, 78, 58, 70, 46].map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center justify-end gap-2"><div className={cn('w-full max-w-8 rounded-t-lg transition group-hover:bg-[#397967]', index === 3 ? 'bg-[#d8973e]' : 'bg-[#9cc7b3]')} style={{ height: height + '%' }} /><span className="text-[10px] text-muted-foreground">{['M', 'T', 'W', 'T', 'F', 'M', 'T'][index]}</span></div>)}</div><div className="flex items-start gap-3 rounded-xl bg-[#fff4df] p-3"><TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[#c27a29]" /><p className="text-xs leading-5 text-[#84622c]">Your highest interruption window is 1–3 PM. Protecting 90 minutes of focus time there could recover about 4 hours a week.</p></div></CardContent></Card></div></div>
}

type RetroItem = { text: string; author: string; tag?: string }
type RetroSection = 'board' | 'actions' | 'insights' | 'history'
const retroPaths: Record<RetroSection, '/retrospective' | '/retrospective/board' | '/retrospective/actions' | '/retrospective/insights' | '/retrospective/history'> = { board: '/retrospective/board', actions: '/retrospective/actions', insights: '/retrospective/insights', history: '/retrospective/history' }
type RetroActionStatus = 'Open' | 'Completed' | 'Archived'
type RetroAction = { sprint: string; text: string; owner: string; status: RetroActionStatus }

function RetrospectivePage({ section = 'board' }: { section?: RetroSection }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState<RetroSection>(section)
  const [problem, setProblem] = useState('')
  const [problems, setProblems] = useState<RetroItem[]>([{ text: 'UAT feedback arrived too late in the sprint', author: 'Marlie S.', tag: 'Communication' }, { text: 'Test environment was unstable during release week', author: 'Ezequiel R.', tag: 'Environment' }])
  const [wellNote, setWellNote] = useState('')
  const [wellNotes, setWellNotes] = useState<RetroItem[]>([{ text: 'Release support rotation made handoffs calmer.', author: 'Marlie S.' }, { text: 'The API checklist caught two issues before UAT.', author: 'Keil D.' }, { text: 'Pairing sessions helped newer teammates ramp up.', author: 'Ezequiel R.' }])
  const [actionText, setActionText] = useState('')
  const [actions, setActions] = useState<RetroItem[]>([{ text: 'Create an API testing checklist', author: 'Keil D.', tag: 'Completed' }, { text: 'Improve UAT communication', author: 'Marlie S.', tag: 'Open' }, { text: 'Rotate release support', author: 'Amiel M.', tag: 'Completed' }])
  const [summaryVisible, setSummaryVisible] = useState(false)
  const [summaryGenerated, setSummaryGenerated] = useState(false)
  const [feedback, setFeedback] = useState('')

  const changeSection = (value: string) => { const nextSection = value as RetroSection; setTab(nextSection); void navigate({ to: retroPaths[nextSection] }) }
  const addProblem = () => { if (!problem.trim()) return; setProblems((current) => [...current, { text: problem.trim(), author: 'Amiel M.', tag: 'Suggested: Requirements' }]); setProblem(''); setFeedback('Problem added to the retro board.') }
  const addWellNote = () => { if (!wellNote.trim()) return; setWellNotes((current) => [...current, { text: wellNote.trim(), author: 'Amiel M.' }]); setWellNote(''); setFeedback('What went well note added.') }
  const addAction = () => { if (!actionText.trim()) return; setActions((current) => [...current, { text: actionText.trim(), author: 'Amiel M.', tag: 'Open' }]); setActionText(''); setFeedback('Action added to the sprint follow-up list.') }
  const startNewRetro = () => { setProblems([]); setWellNotes([]); setActions([]); setSummaryVisible(false); setSummaryGenerated(false); setFeedback('New retro started. The board is ready for fresh notes.') }

  return <div><PageIntro eyebrow="Prototype 05 / Retrospective intelligence" title="Make every retro remember more." description="A home for team reflection that connects what happened, what keeps happening, and what the team said it would do next." action={<div className="flex gap-2"><Button onClick={() => void navigate({ to: '/retrospective/history' })} variant="outline"><Search className="h-4 w-4" /> Search history</Button><Button onClick={startNewRetro} variant="coral"><Plus className="h-4 w-4" /> New retro</Button></div>} /><Feedback message={feedback} /><div className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-[#ebdbe1] bg-[#fceff3] p-5 sm:flex-row sm:items-center"><div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f2d8e1] text-[#b75976]"><Sparkles className="h-5 w-5" /></div><div><div className="flex items-center gap-2"><h2 className="font-display font-bold">Sprint 72 · Platform team</h2><Badge variant="violet">AI ready</Badge></div><p className="mt-1 text-sm text-[#876876]">Wednesday, June 12 · 8 participants · 42 minutes</p></div></div><Button onClick={() => setSummaryVisible((current) => !current)} variant="outline" className="border-[#e7cdd6] bg-white/50">{summaryVisible ? 'Hide sprint summary' : 'View sprint summary'} <ChevronRight className="h-4 w-4" /></Button></div>{summaryVisible && <Card className="mb-5 border-[#ebdbe1] bg-[#fff8fa]"><CardContent className="p-5"><div className="flex items-center gap-2 font-display font-bold"><Sparkles className="h-4 w-4 text-[#b75976]" /> Sprint summary</div><p className="mt-2 text-sm leading-6 text-[#765a67]">The team improved release handoffs, but late UAT feedback and environment stability remain the clearest opportunities for the next sprint.</p></CardContent></Card>}<Tabs value={tab} onValueChange={changeSection}><TabsList><TabsTrigger value="board">Retro board</TabsTrigger><TabsTrigger value="actions">Action hub <span className="ml-1.5 rounded-full bg-[#f1dfe5] px-1.5 text-[10px]">{actions.filter((item) => item.tag === 'Open').length}</span></TabsTrigger><TabsTrigger value="insights">Insights</TabsTrigger><TabsTrigger value="history">History</TabsTrigger></TabsList><TabsContent value="board"><div className="grid gap-4 lg:grid-cols-3"><RetroColumn title="What went well" count={String(wellNotes.length).padStart(2, '0')} color="green"><div className="space-y-2">{wellNotes.map((item, index) => <RetroNote key={item.text + index} text={item.text} author={item.author} tone="green" />)}</div><div className="mt-3 space-y-2"><Input value={wellNote} onChange={(event) => setWellNote(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addWellNote() }} placeholder="Write a win..." /><Button onClick={addWellNote} variant="soft" className="w-full"><Plus className="h-4 w-4" /> Add note</Button></div></RetroColumn><RetroColumn title="Problems" count={String(problems.length).padStart(2, '0')} color="coral"><div className="space-y-2">{problems.map((item, index) => <RetroNote key={item.text + index} text={item.text} author={item.author} tone="coral" tag={item.tag} />)}</div><div className="mt-3 space-y-2"><Input value={problem} onChange={(event) => setProblem(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addProblem() }} placeholder="Write a problem..." /><Button onClick={addProblem} variant="coral" className="w-full"><Plus className="h-4 w-4" /> Add problem</Button></div></RetroColumn><RetroColumn title="Actions" count={String(actions.length).padStart(2, '0')} color="violet"><div className="space-y-2">{actions.map((item, index) => <RetroNote key={item.text + index} text={item.text} author={item.author} tone="violet" tag={item.tag} />)}</div><div className="mt-3 space-y-2"><Input value={actionText} onChange={(event) => setActionText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addAction() }} placeholder="Write an action..." /><Button onClick={addAction} variant="outline" className="w-full"><Plus className="h-4 w-4" /> Add action</Button></div></RetroColumn></div><Card className="mt-5 bg-[#1e2b2d] text-white"><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#b9e2c6] text-[#1e2b2d]"><Bot className="h-5 w-5" /></div><div className="flex-1"><div className="font-display font-bold">Retro Summary AI is ready</div><p className="mt-1 text-sm text-[#a8bbb2]">Generate a summary with key strengths, primary problems, and action items when the retro ends.</p></div><Button onClick={() => { setSummaryGenerated(true); setFeedback('AI summary generated from the current board.') }} variant="soft">{summaryGenerated ? 'Summary generated' : 'Generate summary'} <Sparkles className="h-4 w-4" /></Button></CardContent></Card>{summaryGenerated && <Card className="mt-5 border-[#d7e8dc] bg-[#eef8f0]"><CardContent className="p-5 text-sm leading-6 text-[#47715a]">The team is strongest at collaboration and release support. Focus next sprint on earlier UAT feedback and a more stable test environment.</CardContent></Card>}</TabsContent><TabsContent value="actions"><ActionHub /></TabsContent><TabsContent value="insights"><RetroInsights /></TabsContent><TabsContent value="history"><RetroHistory /></TabsContent></Tabs></div>
}

function RetroColumn({ title, count, color, children }: { title: string; count: string; color: 'green' | 'coral' | 'violet'; children: ReactNode }) { return <div className="rounded-2xl border border-border bg-[#f9faf8] p-4"><div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><span className={cn('h-2 w-2 rounded-full', color === 'green' ? 'bg-[#4ca272]' : color === 'coral' ? 'bg-[#e77d68]' : 'bg-[#8069c1')} /><h3 className="font-display font-bold">{title}</h3></div><span className="text-xs font-bold text-muted-foreground">{count}</span></div>{children}</div> }
function RetroNote({ text, author, tone, tag }: { text: string; author: string; tone: 'green' | 'coral' | 'violet'; tag?: string }) { return <div className="rounded-xl border border-border bg-white p-3"><div className="text-sm leading-5">{text}</div><div className="mt-3 flex items-center gap-2"><Avatar name={author} /><span className="text-xs text-muted-foreground">{author}</span>{tag && <Badge className="ml-auto" variant={tone === 'coral' ? 'warning' : tone === 'violet' ? (tag === 'Open' ? 'danger' : 'success') : 'success'}>{tag}</Badge>}</div></div> }

function ActionHub() {
  const [filter, setFilter] = useState<'All' | RetroActionStatus>('All')
  const [rows, setRows] = useState<RetroAction[]>([
    { sprint: 'Sprint 71', text: 'Improve UAT communication', owner: 'Marlie S.', status: 'Open' },
    { sprint: 'Sprint 71', text: 'Create API testing checklist', owner: 'Keil D.', status: 'Completed' },
    { sprint: 'Sprint 71', text: 'Rotate release support', owner: 'Amiel M.', status: 'Completed' },
    { sprint: 'Sprint 72', text: 'Automate retrospective', owner: 'Ezequiel R.', status: 'Archived' },
  ])
  const filters: Array<'All' | RetroActionStatus> = ['All', 'Open', 'Completed', 'Archived']
  const cycleFilter = () => setFilter((current) => filters[(filters.indexOf(current) + 1) % filters.length])
  const toggleStatus = (text: string) => setRows((current) => current.map((row) => row.text === text ? { ...row, status: row.status === 'Open' ? 'Completed' : row.status === 'Completed' ? 'Archived' : 'Open' } : row))
  const visibleRows = rows.filter((row) => filter === 'All' || row.status === filter)

  return <Card><CardHeader className="flex-row items-start justify-between"><div><CardTitle>Action items across sprints</CardTitle><CardDescription>Click a status to cycle it; filters update the list immediately.</CardDescription></div><Button onClick={cycleFilter} variant="outline"><Filter className="h-4 w-4" /> {filter}</Button></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="border-b border-border text-xs text-muted-foreground"><tr><th className="pb-3 font-medium">Sprint</th><th className="pb-3 font-medium">Action</th><th className="pb-3 font-medium">Owner</th><th className="pb-3 font-medium">Status</th></tr></thead><tbody>{visibleRows.map((row) => <tr key={row.text} className="border-b border-border last:border-0"><td className="py-4 text-muted-foreground">{row.sprint}</td><td className="py-4 font-semibold">{row.text}</td><td className="py-4"><div className="flex items-center gap-2"><Avatar name={row.owner} />{row.owner}</div></td><td className="py-4"><button onClick={() => toggleStatus(row.text)}><Badge variant={row.status === 'Open' ? 'danger' : row.status === 'Completed' ? 'success' : 'secondary'}>{row.status}</Badge></button></td></tr>)}</tbody></table></div>{visibleRows.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No action items match this filter.</p>}</CardContent></Card>
}

function RetroInsights() { return <div className="grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle>Recurring problem areas</CardTitle><CardDescription>Patterns across the last 8 sprints</CardDescription></CardHeader><CardContent className="space-y-5"><InsightBar label="Environment" value="8 occurrences" percent={88} color="bg-[#c96986]" /><InsightBar label="Communication" value="6 occurrences" percent={68} color="bg-[#d8956d]" /><InsightBar label="Requirements clarity" value="5 occurrences" percent={55} color="bg-[#e1bd79]" /><div className="rounded-xl bg-[#fceff3] p-3 text-xs leading-5 text-[#845c6b]"><Bot className="mr-1 inline h-3.5 w-3.5" /> Environment-related issues appeared in 7 consecutive sprints. Similar actions were created twice, suggesting the root cause is not fully resolved.</div></CardContent></Card><Card><CardHeader><CardTitle>Action item health</CardTitle><CardDescription>Follow-through is trending in the right direction</CardDescription></CardHeader><CardContent><div className="flex items-end gap-7"><div><div className="font-display text-4xl font-bold">78%</div><div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#3b8b65]"><TrendingUp className="h-3.5 w-3.5" /> +10% since 2 sprints ago</div></div><div className="flex h-20 flex-1 items-end gap-1.5">{[30, 42, 36, 56, 60, 68, 78].map((height, index) => <div key={index} className="flex-1 rounded-t-md bg-[#a9d5ba]" style={{ height: `${height}%` }} />)}</div></div><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#fff0ea] p-3"><div className="text-2xl font-bold text-[#b95748]">12</div><div className="mt-1 text-xs text-muted-foreground">open · 4 sprints</div></div><div className="rounded-xl bg-[#e4f3e8] p-3"><div className="text-2xl font-bold text-[#3f895e]">06</div><div className="mt-1 text-xs text-muted-foreground">completed · 2 sprints</div></div></div></CardContent></Card></div> }
function InsightBar({ label, value, percent, color }: { label: string; value: string; percent: number; color: string }) { return <div><div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{label}</span><span className="text-muted-foreground">{value}</span></div><Progress value={percent} indicatorClassName={color} /></div> }
function RetroHistory() {
  const [query, setQuery] = useState('')
  const historyItems = [['Sprint 72', 'Environment and UAT communication', 'Jun 12, 2024', 'AI summary ready'], ['Sprint 71', 'Release readiness and support rotation', 'May 29, 2024', 'Reviewed'], ['Sprint 70', 'Test data and deployment flow', 'May 15, 2024', 'Reviewed']] as const
  const visibleItems = historyItems.filter(([, title, , status]) => (title + ' ' + status).toLowerCase().includes(query.toLowerCase()))
  return <Card><CardHeader><div className="flex items-center justify-between gap-4"><div><CardTitle>Retro history</CardTitle><CardDescription>Search what the team has already learned.</CardDescription></div><div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="w-52 pl-9" placeholder="Search retros..." /></div></div></CardHeader><CardContent className="space-y-2">{visibleItems.map(([sprint, title, date, status]) => <div key={sprint} className="flex items-center gap-4 rounded-xl border border-border p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fbeaf0] text-xs font-bold text-[#bd5e79]">{sprint.replace('Sprint ', '')}</div><div className="min-w-0 flex-1"><div className="font-semibold">{title}</div><div className="mt-1 text-xs text-muted-foreground">{date} · 8 participants</div></div><Badge variant={status === 'AI summary ready' ? 'violet' : 'secondary'}>{status}</Badge><ChevronRight className="h-4 w-4 text-muted-foreground" /></div>)}{visibleItems.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No retros match “{query}”.</p>}</CardContent></Card>
}

type Contribution = { title: string; category: string; impact: string; date: string }
function WatcherPage() {
  const [contribution, setContribution] = useState('')
  const [category, setCategory] = useState('Project delivery')
  const [filter, setFilter] = useState('All')
  const [showSummary, setShowSummary] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [entries, setEntries] = useState<Contribution[]>([{ title: 'Unblocked UAT handoff by clarifying acceptance criteria', category: 'Collaboration', impact: 'Reduced review loop by 1 day', date: 'Today' }, { title: 'Created API testing checklist for release support', category: 'Process improvement', impact: 'Reusable for future sprints', date: 'Yesterday' }, { title: 'Completed accessibility learning module', category: 'Learning', impact: 'Applied to prototype review', date: 'Jun 10' }])
  const categories = ['All', 'Project delivery', 'Bug fix', 'Learning', 'Process improvement', 'Collaboration']
  const addContribution = () => { if (!contribution.trim()) { setFeedback('Describe the outcome before saving your contribution.'); return }; setEntries((current) => [{ title: contribution.trim(), category, impact: 'Impact to be added', date: 'Today' }, ...current]); setContribution(''); setFeedback('Contribution saved to your review-cycle history.') }
  const visibleEntries = entries.filter((entry) => filter === 'All' || entry.category === filter)
  const exportSummary = () => { const rows = entries.map((entry) => [entry.date, entry.category, entry.title, entry.impact]); downloadTextFile('contribution-summary.csv', [['Date', 'Category', 'Contribution', 'Impact'], ...rows].map((row) => row.map(csvValue).join(',')).join('\n'), 'text/csv'); setFeedback('Contribution summary downloaded as a CSV.') }
  const cycleFilter = () => setFilter(categories[(categories.indexOf(filter) + 1) % categories.length])
  const removeEntry = (title: string) => setEntries((current) => current.filter((entry) => entry.title !== title))

  return <div><PageIntro eyebrow="Prototype 06 / The Watcher" title="Keep an evidence trail for the work that matters." description="A personal contribution log that helps employees tell the story of their work—and gives managers a better starting point for feedback." action={<Button onClick={exportSummary} variant="outline"><Download className="h-4 w-4" /> Export summary PDF</Button>} /><Feedback message={feedback} /><div className="mb-6 grid gap-4 sm:grid-cols-3"><StatCard label="Contributions" value={String(entries.length + 9)} note="this review cycle" icon={ListChecks} tone="blue" /><StatCard label="Business impact" value="4 themes" note="detected" icon={Target} tone="green" /><StatCard label="Feedback moments" value="03" note="from your manager" icon={MessageSquare} tone="violet" /></div><div className="grid gap-5 xl:grid-cols-[1fr_1.4fr]"><Card className="border-[#d8e6f1] bg-[#e8f1f9]"><CardHeader><Badge className="w-fit border-0 bg-[#d5e7f5] text-[#4b7fa8]">DAILY CONTRIBUTION</Badge><CardTitle className="mt-3">What did you move forward?</CardTitle><CardDescription>Capture the outcome, not just the activity. This log is yours to shape.</CardDescription></CardHeader><CardContent className="space-y-3"><Textarea value={contribution} onChange={(event) => setContribution(event.target.value)} className="min-h-28 border-[#c8dce9] bg-white" placeholder="e.g. Coordinated the release handoff and made the blockers visible..." /><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 w-full rounded-xl border border-[#c8dce9] bg-white px-3 text-sm outline-none"><option>Project delivery</option><option>Bug fix</option><option>Learning</option><option>Process improvement</option><option>Collaboration</option></select><Button onClick={addContribution} className="w-full bg-[#4f83b2] hover:bg-[#426f99]">Save contribution <Check className="h-4 w-4" /></Button></CardContent></Card><Card><CardHeader className="flex-row items-start justify-between"><div><CardTitle>Your contribution history</CardTitle><CardDescription>A record you can revisit before a one-on-one.</CardDescription></div><Button onClick={cycleFilter} variant="ghost" size="sm"><Filter className="h-4 w-4" /> {filter}</Button></CardHeader><CardContent className="space-y-2">{visibleEntries.map((entry, index) => <div key={entry.title + index} className="rounded-xl border border-border p-4"><div className="flex gap-3"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#e8f1f9] text-[#4f83b2]"><Check className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="text-sm font-semibold leading-5">{entry.title}</div><div className="mt-2 flex flex-wrap items-center gap-2"><Badge variant="secondary">{entry.category}</Badge><span className="text-xs text-muted-foreground">{entry.date}</span></div><div className="mt-3 text-xs text-[#4f83b2]">Impact · {entry.impact}</div></div><button onClick={() => removeEntry(entry.title)} title="Remove contribution" className="h-fit text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4 shrink-0" /></button></div></div>)}{visibleEntries.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No contributions match this filter.</p>}</CardContent></Card></div><Card className="mt-5 bg-[#1e2b2d] text-white"><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#d5e7f5] text-[#4f83b2]"><Bot className="h-5 w-5" /></div><div className="flex-1"><div className="font-display font-bold">Manager assist · AI summary</div><p className="mt-1 max-w-3xl text-sm leading-5 text-[#a8bbb2]">Across {entries.length + 9} entries, your strongest themes are cross-team collaboration, making release work more repeatable, and turning blockers into clearer processes. This is decision support—not an evaluation.</p></div><Button onClick={() => setShowSummary((current) => !current)} variant="soft">{showSummary ? 'Hide summary' : 'Open summary'} <ChevronRight className="h-4 w-4" /></Button></CardContent></Card>{showSummary && <Card className="mt-5 border-[#c8dce9] bg-[#f2f8fc]"><CardContent className="p-5 text-sm leading-6 text-[#4b6f8a]">Your recent entries emphasize collaboration and process improvement. Use these themes as prompts for your next one-on-one, not as an automatic evaluation.</CardContent></Card>}</div>
}

function RetroBoardRoute() { return <RetrospectivePage section="board" /> }
function RetroActionsRoute() { return <RetrospectivePage section="actions" /> }
function RetroInsightsRoute() { return <RetrospectivePage section="insights" /> }
function RetroHistoryRoute() { return <RetrospectivePage section="history" /> }

const rootRoute = createRootRoute({ component: AppShell })
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Overview })
const attendanceRoute = createRoute({ getParentRoute: () => rootRoute, path: '/attendance', component: AttendancePage })
const automationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/automation-finder', component: AutomationPage })
const queueRoute = createRoute({ getParentRoute: () => rootRoute, path: '/queue-health', component: QueuePage })
const interruptionsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/interruptions', component: InterruptionsPage })
const retrospectiveRoute = createRoute({ getParentRoute: () => rootRoute, path: '/retrospective', component: RetroBoardRoute })
const retrospectiveBoardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/retrospective/board', component: RetroBoardRoute })
const retrospectiveActionsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/retrospective/actions', component: RetroActionsRoute })
const retrospectiveInsightsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/retrospective/insights', component: RetroInsightsRoute })
const retrospectiveHistoryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/retrospective/history', component: RetroHistoryRoute })
const watcherRoute = createRoute({ getParentRoute: () => rootRoute, path: '/watcher', component: WatcherPage })
const routeTree = rootRoute.addChildren([indexRoute, attendanceRoute, automationRoute, queueRoute, interruptionsRoute, retrospectiveRoute, retrospectiveBoardRoute, retrospectiveActionsRoute, retrospectiveInsightsRoute, retrospectiveHistoryRoute, watcherRoute])
export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' { interface Register { router: typeof router } }
