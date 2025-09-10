"use client"

import BreadcrumbComponent from '@/components/common/Breadcrumb'
import { DataTable } from '@/components/common/DataTable'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import EditUser from './components/EditUser'
import { Button } from '@/components/ui/button'
import { Columns } from './components/Columns'

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
        <div className='flex items-center justify-between w-full'>
          <h1 className="text-2xl font-bold">Users</h1>
          <div>
            <Sheet>
               <SheetTrigger asChild>
                  <Button variant="outline">Add User</Button>
                </SheetTrigger>
              <EditUser />
            </Sheet>
          </div>
        </div>
        {/* User List Show */}
        <DataTable columns={Columns} data={allData} />
      </div>
    </div>
  )
}

export default UserPage