import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const notFound = () => {
  return (
    <div>
      notFo
      <div className="flex justify-center items-center mt-10">
        <Card className="w-full max-w-md text-center py-10">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-muted-foreground">
              User Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The user you are looking for does not exist or may have been
              removed.
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
      und
    </div>
  );
};

export default notFound;
