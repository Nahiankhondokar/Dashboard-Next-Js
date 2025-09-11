"use client"

import BreadcrumbComponent from '@/components/common/Breadcrumb'
import { DataTable } from '@/components/common/DataTable'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import EditUser from './components/EditUser'
import { Button } from '@/components/ui/button'
import { Columns } from './components/columns'
import { useUserStore } from '@/stores/useUserStore'

// const allData = [
//     {
//       id: 1,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 2,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 3,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 4,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 5,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 6,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 7,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 8,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 9,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id:10,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 11,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     },
//     {
//       id: 12,
//       name: "Namian",
//       email: "test@gmail.com",
//       username: "nahi",
//       phone: "01308663002",
//       role : "Admin",
//       image : "image.png",
//       status: true,
//     }
//   ];



const UserPage = () => {
  const pathname = usePathname();
      const { allData, fetchUsers, deleteUser, updateUser } = useUserStore();

  useEffect(() => {
    fetchUsers(); // load data when mounted
  }, [fetchUsers]);

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