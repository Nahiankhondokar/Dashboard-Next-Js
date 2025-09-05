"use client"

import BreadcrumbComponent from '@/components/common/Breadcrumb';
import { usePathname } from 'next/navigation'
import React from 'react'

const SingleUser = () => {
    const pathname = usePathname();
    
  return (
    <div>
         <BreadcrumbComponent pathname={pathname} />
        {pathname}
    </div>
  )
}

export default SingleUser