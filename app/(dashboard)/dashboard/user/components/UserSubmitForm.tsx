"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  phone: z.string(),
  role: z.string(),
  status: z.number().default(0),
  image: z.instanceof(File).nullable().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

const  AddUserForm = () => {

   const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone: "",
      role: "",
      status: 0, // default number
      image: null,
    },
  })


const onSubmit = async (values: FormSchemaType) => {
  console.log("Form Values:", values)

  const formData = new FormData()
  formData.append("name", values.name)
  formData.append("email", values.email)
  formData.append("username", values.username)
  formData.append("phone", values.phone)
  formData.append("role", values.role)
  formData.append("status", String(values.status)) // Use String() to safely convert number to string

  if (values.image) {
    formData.append("image", values.image) // 👈 only if provided
  }

try {
    const res = await fetch("/api/users", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`)
    }

    const data = await res.json()
    console.log("User created:", data)

    // ✅ Optional: show success toast or reset form
    form.reset()
  } catch (error) {
    console.error("Failed to create user:", error)
  }
}



  return (
    <Form {...form}>
      <form
         id="user-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+8801XXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload (Optional) */}
       <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
      />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value === 1} // Convert number to boolean for UI
                  onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)} // Convert boolean back to number
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" variant="outline" className="w-full">
          Add User
        </Button>
      </form>
    </Form>
  )
}


export default AddUserForm;