"use client"

import BreadcrumbComponent from '@/components/Breadcrumb'
import { DataTable } from '@/components/DataTable'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Columns } from './components/columns'

const allData = [
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    {
      id: "728ed52f",
      name: "Namian",
      email: "test@gmail.com",
      username: "nahi",
      phone: "01308663002",
      role : "Admin",
      image : "image.png",
      status: true,
    },
    
  ];

const UserPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <BreadcrumbComponent pathname={pathname} />
      <div>
        <DataTable columns={Columns} data={allData} />
      </div>
    </div>
  )
}

export default UserPage