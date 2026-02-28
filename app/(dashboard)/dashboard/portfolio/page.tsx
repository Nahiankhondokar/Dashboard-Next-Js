"use client";

import BreadcrumbComponent from "@/components/common/Breadcrumb";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {useServiceStore} from "@/stores/useServiceStore";
import {useEffect} from "react";
import AddNewPortfolio from "./components/AddNewPortfolio";
import PortfolioTable from "@/app/(dashboard)/dashboard/portfolio/components/PortfolioTable";
import {usePortfolioStore} from "@/stores/usePortfolioStore";

const Service = () => {
  const pathname = usePathname();
  const {
      fetchPortfolio,
      loading,
      error,
      openCreateModal,
      modalOpen,
      closeModal,
      mode
  } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolio();
  }, [mode]);

  return (
    <div>
      <BreadcrumbComponent pathname={pathname} />
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <Button  variant={"outline"} onClick={openCreateModal}>Add New</Button>
        </div>

        {/*Portfolio Table*/}
        <PortfolioTable />

        <Dialog open={modalOpen} onOpenChange={(v) => !v && closeModal()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {mode === "create" ? "Add Portfolio" : "Edit Portfolio"}
              </DialogTitle>
            </DialogHeader>

            <AddNewPortfolio />
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default Service;
