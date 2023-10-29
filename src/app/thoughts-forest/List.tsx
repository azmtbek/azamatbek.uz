import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ListCard = () => (
  <Card className="flex w-full items-center justify-between">
    <CardHeader>
      <CardTitle>Card View</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>
);

const List = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <ListCard />
    </div>
  );
};

export default List;
