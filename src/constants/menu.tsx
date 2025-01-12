import Image from 'next/image'

type SIDE_BAR_MENU_PROPS = {
  label: string
  icon?: string
  path: string
}

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: 'Dashboard',
    icon: '/icons/dashboard.svg',
    path: 'dashboard',
  },
  {
    label: 'Conversations',
    icon: '/icons/chat.svg',
    path: 'conversation',
  },
  {
    label: 'Integrations',
    icon: '/icons/integrations.svg',
    path: 'integration',
  },
  {
    label: 'Settings',
    icon: '/icons/settings.svg',
    path: 'settings',
  },
  {
    label: 'Appointments',
    icon: '/icons/cal.svg',
    path: 'appointment',
  },
  {
    label: 'Email Marketing',
    icon: '/icons/email.svg',
    path: 'email-marketing',
  },
]

type TABS_MENU_PROPS = {
  label: string
  icon?: string
}

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'unread',
    icon: '/icons/email.svg',
  },
  {
    label: 'all',
    icon: '/icons/email.svg',
  },
  {
    label: 'expired',
    icon: '/icons/timer.svg',
  },
  {
    label: 'starred',
    icon: '/icons/star.svg',
  },
]

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'help desk',
  },
  {
    label: 'questions',
  },
]

export const APPOINTMENT_TABLE_HEADER = [
  'Name',
  'RequestedTime',
  'Added Time',
  'Domain',
]

export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Answers', 'Domain']

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
    icon: '/icons/chat.svg',
  },
  {
    label: 'helpdesk',
    icon: '/icons/help-desk.svg',
  },
]