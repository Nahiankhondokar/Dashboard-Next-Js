import React from "react"
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import UserSubmitForm from "./UserSubmitForm"
import { Button } from "@/components/ui/button"

const EditUser = () => {
  return (
    <SheetContent className="flex flex-col h-full">
      {/* Header */}
      <SheetHeader>
        <SheetTitle>Add New User</SheetTitle>
        <SheetDescription>
          You can add multiple users in your application.
        </SheetDescription>
        <Separator />
      </SheetHeader>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto pr-2">
        <UserSubmitForm />
      </div>
    </SheetContent>
  )
}

export default EditUser
