"use client"

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {

  const onServerActionClick = () => {
   admin().then((res) => {
      if (res.success) {
        toast.success(res.success);
      } else {
        toast.error(res.error);
      }
    });
  }

  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Admin API Route Success");
      } else {
       toast.error("Admin API Route Failed");
      }
    });
  }
    return (
        <Card className="w-[600px]">
          <CardHeader>
          <p className="text-2xl font-semibold text-center">
          Admin
          </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
              <FormSuccess message="You are allowed to see this content"/>
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
             <p className="text-sm font-medium">
              Admin-only API Route
             </p>
             <Button onClick={onApiRouteClick}>
              Click to test
             </Button>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
             <p className="text-sm font-medium">
              Admin-only Server Action
             </p>
             <Button onClick={onServerActionClick}>
              Click to test
             </Button>
            </div>
          </CardContent>
        </Card>
    )
}

export default AdminPage;
