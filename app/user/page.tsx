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

const UserPage = () => {
  const pathname = usePathname();
      const { Users, fetchUsers, deleteUser, updateUser } = useUserStore();

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
        <DataTable columns={Columns} data={Users} />
      </div>
    </div>
  )
}

export default UserPage