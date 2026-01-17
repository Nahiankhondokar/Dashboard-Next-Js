"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DataTablePagination } from "@/components/common/DataTablePagination"

export function ExperienceTable() {

  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const pathname = usePathname();

  return (
      <>
        {/* Bulk Actions Bar */}
        {/*{selectedInvoices.length > 0 && (*/}
        {/*    <div className="bg-[#F9FAFB] border border-[#E4E4E7] rounded-lg px-4 py-6 mt-9">*/}
        {/*      <div className="flex items-center justify-between">*/}
        {/*        <div className="flex items-center gap-2">*/}
        {/*      <span className="text-sm font-medium text-[#18181B capitalize">*/}
        {/*        {selectedInvoices.length} invoice(s) selected*/}
        {/*      </span>*/}
        {/*          <Button*/}
        {/*              variant="outline"*/}
        {/*              size="sm"*/}
        {/*              onClick={() => setSelectedInvoices([])}*/}
        {/*              className="h-7 px-2 text-xs"*/}
        {/*          >*/}
        {/*            Clear*/}
        {/*          </Button>*/}
        {/*        </div>*/}
        {/*        <div className="flex items-center gap-2">*/}
        {/*          /!* Status Change Dropdown *!/*/}
        {/*          <Select onValueChange={(value) => bulkStatusChange(value)}>*/}
        {/*            <SelectTrigger className="w-40 h-8">*/}
        {/*              <SelectValue placeholder="Change Status" />*/}
        {/*            </SelectTrigger>*/}
        {/*            <SelectContent>*/}
        {/*              {Object.values(InvoiceStatusEnum).map((status) => {*/}
        {/*                if (status.toString().length < 2) return null;*/}
        {/*                return (*/}
        {/*                    <SelectItem*/}
        {/*                        key={status}*/}
        {/*                        value={InvoiceStatusEnum[*/}
        {/*                            status as keyof typeof InvoiceStatusEnum*/}
        {/*                            ].toString()}*/}
        {/*                    >*/}
        {/*                      {camelCaseToSpace(status.toString())}*/}
        {/*                    </SelectItem>*/}
        {/*                );*/}
        {/*              })}*/}
        {/*            </SelectContent>*/}
        {/*          </Select>*/}

        {/*          /!* Send to Client Button *!/*/}
        {/*          <Button*/}
        {/*              variant="outline"*/}
        {/*              size="sm"*/}
        {/*              onClick={bulkSendToClient}*/}
        {/*              disabled={bulkActionLoading}*/}
        {/*              className="h-8 px-3"*/}
        {/*          >*/}
        {/*            <IconMail className="w-4 h-4 mr-1" />*/}
        {/*            Send to Client*/}
        {/*          </Button>*/}

        {/*          /!* Delete Button *!/*/}
        {/*          <DeleteDialog*/}
        {/*              onDelete={() => bulkDelete()}*/}
        {/*              text="Are you sure you want to delete these quotations?"*/}
        {/*          >*/}
        {/*            <Button*/}
        {/*                variant="outline"*/}
        {/*                size="sm"*/}
        {/*                disabled={bulkActionLoading}*/}
        {/*                className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"*/}
        {/*            >*/}
        {/*              <IconTrash className="w-4 h-4 mr-1" />*/}
        {/*              Delete*/}
        {/*            </Button>*/}
        {/*          </DeleteDialog>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*)}*/}

        <TableGenerator
            loading={loading}
            bulkActions={true}
            selectAllCheckbox={
              <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  className="border-[#E4E4E7] data-[state=checked]:bg-brand-color data-[state=checked]:border-brand-color"
                  ref={(el) => {
                    if (el) {
                      const checkbox = el.querySelector(
                          'input[type="checkbox"]',
                      ) as HTMLInputElement;
                      if (checkbox) {
                        checkbox.indeterminate = isPartiallySelected;
                      }
                    }
                  }}
              />
            }
            headers={[
              "Invoice No",
              "Subject",
              "Contact Name",
              "Due Date ",
              "Amount",
              "Status",
              "Actions",
            ]}
        >
          {invoices.map((invoice) => {
            const isSelected = selectedInvoices.includes(invoice.id.toString());
            return (
                <TableRow
                    key={invoice.id}
                    className={cn(isSelected && "bg-[#F9FAFB]")}
                >
                  <TableCell className="py-4 px-[16px]">
                    <Checkbox
                        className="border-[#E4E4E7] data-[state=checked]:bg-brand-color data-[state=checked]:border-brand-color"
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                            handleSelectInvoice(
                                invoice.id.toString(),
                                checked as boolean,
                            )
                        }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Link
                          href={`/invoices/${invoice?.invoice_no}`}
                          className="text-base-card-forground text-sm hover:text-brand-color transition-all duration-300 first-letter:capitalize"
                      >
                        {invoice?.generatedId || invoice?.invoice_no}
                      </Link>

                      {invoice?.publish && (
                          <Tooltip text="View public invoice">
                            <Link
                                href={`/public/invoice/${invoice?.slug}`}
                                target="_blank"
                            >
                              <IconExternalLink className="w-4 h-4 my-2.5 text-brand-color" />
                            </Link>
                          </Tooltip>
                      )}
                      {/* show overdue badge */}
                      {invoice?.due_date &&
                          [
                            InvoiceStatusEnum.Sent,
                            InvoiceStatusEnum.Pending,
                            InvoiceStatusEnum.Overdue,
                            InvoiceStatusEnum.Refunded,
                            InvoiceStatusEnum.Accepted,
                          ].includes(invoice.status) &&
                          new Date(invoice?.due_date) < new Date() && (
                              <Tooltip text="Overdue Invoice">
                                <Button
                                    size={"icon"}
                                    className="w-[22px] h-[22px] bg-red-100 pointer-events-none"
                                >
                                  <IconCalendar className="w-3 h-3 text-red-500 rounded-[4px]" />
                                </Button>
                              </Tooltip>
                          )}

                      {/* show recurring badge */}
                      {invoice?.recurring_payment &&
                          invoice?.recurring_payment?.is_payment_reccuring && (
                              <Tooltip text="Recurring Invoice">
                                <Button
                                    size={"icon"}
                                    className="w-[22px] h-[22px] bg-blue-100 pointer-events-none"
                                >
                                  <IconRefresh className="w-3 h-3 text-blue-500 rounded-[4px]" />
                                </Button>
                              </Tooltip>
                          )}
                    </div>
                  </TableCell>
                  <TableCell className="text-base-card-forground text-sm first-letter:capitalize">
                    {invoice?.subject}
                  </TableCell>
                  <TableCell>
                    {invoice?.contacts ? (
                        <UserWithAvatar
                            id={invoice?.contacts.id}
                            image={invoice?.contacts?.image?.url ?? ""}
                            name={invoice?.contacts?.full_name}
                            isContact={true}
                        />
                    ) : (
                        <EmptyValue />
                    )}
                  </TableCell>
                  <TableCell>
                    {invoice?.created_at ? (
                        renderDate(invoice?.created_at)
                    ) : (
                        <EmptyValue />
                    )}
                  </TableCell>
                  <TableCell>
                    {invoice?.total ? (
                        `${getCurrencySymbol(invoice?.currency ?? "usd")}${
                            invoice?.total
                        }`
                    ) : (
                        <EmptyValue />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center  gap-2">
                      <InvoiceStatus
                          current={invoice?.status}
                          invoice_id={invoice?.id?.toString()}
                      />
                      <ApproveManualPayment invoice={invoice} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <InvoiceActions invoice={invoice} />
                  </TableCell>
                </TableRow>
            );
          })}
        </TableGenerator>
        {invoices.length > 0 && !loading && meta && links && (
            <Pagination
                fetcher={fetchInvoices}
                loading={loading}
                pagination={{ meta, links }}
                className="mt-7"
            />
        )}
      </>
  )
}