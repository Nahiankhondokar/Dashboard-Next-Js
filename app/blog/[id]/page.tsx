"use client"

import BreadcrumbComponent from '@/components/common/Breadcrumb';
import { usePathname } from 'next/navigation'
import React from 'react'

const SingleBlog = () => {
    const pathname = usePathname();
    
  return (
    <div>
         <BreadcrumbComponent pathname={pathname} />
        {pathname}
    </div>
  )
}

export default SingleBlog