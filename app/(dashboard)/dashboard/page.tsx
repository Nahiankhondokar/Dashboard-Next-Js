"use client"

import AppChartArea from '@/components/common/AppChartArea'
import AppChartBar from '@/components/common/AppChartBar'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {useDashboardStore} from "@/stores/useDashboardStore";
import {useEffect} from "react";

const Dashboard = () => {

    const {
        overview,
        fetchOverview
    } = useDashboardStore();

    // empty arrays (no dummy data)
    const invoices= [];
    const products= [];


    useEffect(() => {
        fetchOverview();
    }, [fetchOverview]);

    return (
        <div className="mb-5">
            {/* ================= Overview ================= */}
            <div className="">
                <h1 className="text-lg font-medium mb-6">Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                    {overview && Object.entries(overview).map(([key, value]) => (
                        <Card key={key}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
                                    {key}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{ value || "0" }</p>
                                <p className="text-xs text-muted-foreground">
                                    Total {key} published
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* ================= Charts ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-2 gap-4 mb-8">
                <Card className="md:col-span-2 lg:col-span-2 xl:col-span-1">
                    <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AppChartBar />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-2 xl:col-span-1">
                    <CardHeader>
                        <CardTitle>Revenue Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AppChartArea />
                    </CardContent>
                </Card>
            </div>

            {/* ================= Tables ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Recent Invoices */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="text-center text-muted-foreground"
                                        >
                                            No invoices found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Best Products */}
                <Card>
                    <CardHeader>
                        <CardTitle>Best Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Sales</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="text-center text-muted-foreground"
                                        >
                                            No products found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;