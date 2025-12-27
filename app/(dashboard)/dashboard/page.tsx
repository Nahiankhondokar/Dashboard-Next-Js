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



const Dashboard = () => {
    // empty arrays (no dummy data)
    const invoices: any[] = [];
    const products: any[] = [];

    return (
        <>
            {/* ================= Overview ================= */}
            <div className="my-8">
                <h1 className="text-lg font-medium mb-6">Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                    {["Total Sales", "Total Orders", "Customers", "Revenue"].map(
                        (title, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        {title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">—</p>
                                    <p className="text-xs text-muted-foreground">
                                        No data available
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    )}
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
        </>
    );
};

export default Dashboard;