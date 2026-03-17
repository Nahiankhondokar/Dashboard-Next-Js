"use client"

import { usePathname } from "next/navigation"
import BreadcrumbComponent from "@/components/common/Breadcrumb"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import UpdateProfileForm from "@/app/(dashboard)/dashboard/profile/components/UpdateProfileForm";
import {useProfileStore} from "@/stores/useProfileStore";
import UpdatePasswordForm from "@/app/(dashboard)/dashboard/profile/components/UpdatePasswordForm";
import UploadResumeForm from "@/app/(dashboard)/dashboard/profile/components/UploadResumeForm";


const Profile = () => {
    const pathname = usePathname()
    const {fetchProfile} = useProfileStore();


    // const handleFetchProfile = async () => {
    //     await fetchProfile();
    // }
    //
    // useEffect(()=> {
    //     handleFetchProfile();
    // }, []);

    return (
        <div className="space-y-6">
            <BreadcrumbComponent pathname={pathname} />

            <Tabs defaultValue="profile" className="w-1/12 xl:w-1/2 sm:w-full">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                </TabsList>

                {/* ================= PROFILE TAB ================= */}
                <TabsContent value="profile">
                    <UpdateProfileForm />
                </TabsContent>

                {/* ================= PASSWORD TAB ================= */}
                <TabsContent value="password">
                    <UpdatePasswordForm />
                </TabsContent>

                {/* ================= RESUME TAB ================= */}
                <TabsContent value="resume">
                    <UploadResumeForm />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default Profile
