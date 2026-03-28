import type { CSSProperties, ComponentType, SVGProps } from 'react';

// Import all Untitled UI icons used in the app
import { Activity } from '@untitledui/icons/Activity';
import { AlertCircle } from '@untitledui/icons/AlertCircle';
import { AlertTriangle } from '@untitledui/icons/AlertTriangle';
import { Archive } from '@untitledui/icons/Archive';
import { Award01 } from '@untitledui/icons/Award01';
import { BarChart01 } from '@untitledui/icons/BarChart01';
import { BarChartSquare01 } from '@untitledui/icons/BarChartSquare01';
import { Box } from '@untitledui/icons/Box';
import { Building01 } from '@untitledui/icons/Building01';
import { Calendar } from '@untitledui/icons/Calendar';
import { Check } from '@untitledui/icons/Check';
import { CheckCircle } from '@untitledui/icons/CheckCircle';
import { ChevronDown } from '@untitledui/icons/ChevronDown';
import { ChevronLeft } from '@untitledui/icons/ChevronLeft';
import { ChevronRight } from '@untitledui/icons/ChevronRight';
import { ChevronUp } from '@untitledui/icons/ChevronUp';
import { Clock } from '@untitledui/icons/Clock';
import { ClockRewind } from '@untitledui/icons/ClockRewind';
import { Code02 } from '@untitledui/icons/Code02';
import { Copy01 } from '@untitledui/icons/Copy01';
import { Database01 } from '@untitledui/icons/Database01';
import { DotsHorizontal } from '@untitledui/icons/DotsHorizontal';
import { Download01 } from '@untitledui/icons/Download01';
import { Edit02 } from '@untitledui/icons/Edit02';
import { Eye } from '@untitledui/icons/Eye';
import { File02 } from '@untitledui/icons/File02';
import { FilterLines } from '@untitledui/icons/FilterLines';
import { FolderClosed } from '@untitledui/icons/FolderClosed';
import { GitBranch01 } from '@untitledui/icons/GitBranch01';
import { Grid01 } from '@untitledui/icons/Grid01';
import { Hand } from '@untitledui/icons/Hand';
import { InfoCircle } from '@untitledui/icons/InfoCircle';
import { Key01 } from '@untitledui/icons/Key01';
import { LayersThree01 } from '@untitledui/icons/LayersThree01';
import { List } from '@untitledui/icons/List';
import { Lock01 } from '@untitledui/icons/Lock01';
import { LogOut01 } from '@untitledui/icons/LogOut01';
import { Map01 } from '@untitledui/icons/Map01';
import { Maximize01 } from '@untitledui/icons/Maximize01';
import { Menu01 } from '@untitledui/icons/Menu01';
import { Minus } from '@untitledui/icons/Minus';
import { Moon01 } from '@untitledui/icons/Moon01';
import { Pin01 } from '@untitledui/icons/Pin01';
import { Play } from '@untitledui/icons/Play';
import { Plus } from '@untitledui/icons/Plus';
import { Recording01 } from '@untitledui/icons/Recording01';
import { RefreshCcw01 } from '@untitledui/icons/RefreshCcw01';
import { RefreshCw01 } from '@untitledui/icons/RefreshCw01';
import { Save01 } from '@untitledui/icons/Save01';
import { SearchLg } from '@untitledui/icons/SearchLg';
import { Send01 } from '@untitledui/icons/Send01';
import { Stars01 } from '@untitledui/icons/Stars01';
import { Settings01 } from '@untitledui/icons/Settings01';
import { Shield01 } from '@untitledui/icons/Shield01';
import { ShoppingCart01 } from '@untitledui/icons/ShoppingCart01';
import { Shuffle01 } from '@untitledui/icons/Shuffle01';
import { Sliders01 } from '@untitledui/icons/Sliders01';
import { Sun } from '@untitledui/icons/Sun';
import { SwitchHorizontal01 } from '@untitledui/icons/SwitchHorizontal01';
import { SwitchVertical01 } from '@untitledui/icons/SwitchVertical01';
import { Trash01 } from '@untitledui/icons/Trash01';
import { Upload01 } from '@untitledui/icons/Upload01';
import { User01 } from '@untitledui/icons/User01';
import { X } from '@untitledui/icons/X';
import { XCircle } from '@untitledui/icons/XCircle';

// Also export commonly used icons for direct import when needed
export {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FilterLines,
  Minus,
  Plus,
  RefreshCw01 as RefreshCw,
  SearchLg,
  X,
};

export type AppIconName =
  | 'add'
  | 'archive'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'box'
  | 'calendar'
  | 'chat'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'clean'
  | 'code'
  | 'cog'
  | 'confirm'
  | 'cross'
  | 'dashboard'
  | 'database'
  | 'disable'
  | 'document'
  | 'document-open'
  | 'download'
  | 'duplicate'
  | 'edit'
  | 'endorsed'
  | 'error'
  | 'exchange'
  | 'eye-open'
  | 'filter'
  | 'floppy-disk'
  | 'flows'
  | 'git-branch'
  | 'hand-right'
  | 'heat-grid'
  | 'history'
  | 'info-sign'
  | 'key'
  | 'layers'
  | 'layout-grid'
  | 'list'
  | 'lock'
  | 'log-out'
  | 'map'
  | 'maximize'
  | 'menu'
  | 'minus'
  | 'more'
  | 'moon'
  | 'office'
  | 'panel-stats'
  | 'pin'
  | 'play'
  | 'plus'
  | 'predictive-analysis'
  | 'projects'
  | 'properties'
  | 'random'
  | 'record'
  | 'refresh'
  | 'reset'
  | 'search'
  | 'send-to'
  | 'shield'
  | 'shopping-cart'
  | 'sort'
  | 'sun'
  | 'th'
  | 'tick'
  | 'time'
  | 'timeline-events'
  | 'trash'
  | 'upload'
  | 'user'
  | 'warning-sign';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const ICONS: Record<AppIconName, IconComponent> = {
  add: Plus,
  archive: Archive,
  'arrow-down': ChevronDown,
  'arrow-left': ChevronLeft,
  'arrow-right': ChevronRight,
  'arrow-up': ChevronUp,
  box: Box,
  calendar: Calendar,
  chat: Stars01,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  clean: XCircle,
  code: Code02,
  cog: Settings01,
  confirm: CheckCircle,
  cross: X,
  dashboard: BarChart01,
  database: Database01,
  disable: XCircle,
  document: File02,
  'document-open': File02,
  download: Download01,
  duplicate: Copy01,
  edit: Edit02,
  endorsed: Award01,
  error: AlertCircle,
  exchange: SwitchHorizontal01,
  'eye-open': Eye,
  filter: FilterLines,
  'floppy-disk': Save01,
  flows: Activity,
  'git-branch': GitBranch01,
  'hand-right': Hand,
  'heat-grid': Grid01,
  history: ClockRewind,
  'info-sign': InfoCircle,
  key: Key01,
  layers: LayersThree01,
  'layout-grid': Grid01,
  list: List,
  lock: Lock01,
  'log-out': LogOut01,
  map: Map01,
  maximize: Maximize01,
  menu: Menu01,
  minus: Minus,
  more: DotsHorizontal,
  moon: Moon01,
  office: Building01,
  'panel-stats': BarChartSquare01,
  pin: Pin01,
  play: Play,
  plus: Plus,
  'predictive-analysis': Activity,
  projects: FolderClosed,
  properties: Sliders01,
  random: Shuffle01,
  record: Recording01,
  refresh: RefreshCw01,
  reset: RefreshCcw01,
  search: SearchLg,
  'send-to': Send01,
  shield: Shield01,
  'shopping-cart': ShoppingCart01,
  sort: SwitchVertical01,
  sun: Sun,
  th: Grid01,
  tick: Check,
  time: Clock,
  'timeline-events': Activity,
  trash: Trash01,
  upload: Upload01,
  user: User01,
  'warning-sign': AlertTriangle,
};

// Default icon size matching design system (--gs-icon-size: 14px)
const DEFAULT_SIZE = 14;

export type AppIconProps = {
  name: AppIconName;
  className?: string;
  style?: CSSProperties;
  size?: number;
};

export function AppIcon({ name, className, style, size = DEFAULT_SIZE }: AppIconProps) {
  const IconComponent = ICONS[name] ?? AlertCircle;
  if (process.env.NODE_ENV !== 'production' && !ICONS[name]) {
    console.warn(`[AppIcon] Unknown icon name: "${name}". Falling back to AlertCircle.`);
  }
  return <IconComponent className={className} style={style} size={size} aria-hidden />;
}
