import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UsersPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage website users and permissions</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">
          User management dashboard coming soon
        </p>
      </CardContent>
    </Card>
  );
};

export default UsersPage;
