"use client"

import BreadcrumbComponent from '@/components/Breadcrumb'
import { usePathname } from 'next/navigation'
import React from 'react'


const UserPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <BreadcrumbComponent pathname={pathname} />
    {pathname}
    </div>
  )
}

export default UserPage