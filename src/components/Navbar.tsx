const NAV_ITEMS = [
  { label: 'Profile', href: '#profile' },
  { label: 'Projects', href: '#projects' },
  { label: 'Moments', href: '#gallery' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
      <ul className="flex bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 gap-3 sm:gap-6 md:gap-12 lg:gap-14">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-colors"
              style={{ color: 'rgba(225, 224, 204, 0.8)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
