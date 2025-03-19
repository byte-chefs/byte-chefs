import HeaderNavLink from '@/components/common/Header/components/HeaderNavLink'
import { publicHeaderNavItems } from '@/components/common/Header/data'

const HeaderNavDesktop = () => {
  return (
    <nav className="hidden space-x-6 uppercase md:flex">
      {publicHeaderNavItems.map((item, index) => (
        <HeaderNavLink key={index} href={item.path}>
          {item.title}
        </HeaderNavLink>
      ))}
    </nav>
  )
}

export default HeaderNavDesktop
