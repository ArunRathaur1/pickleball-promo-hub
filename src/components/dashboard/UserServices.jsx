
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserServices = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Services</CardTitle>
        <CardDescription>
          Manage your pickleball marketing services
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 text-center">
        <p className="text-muted-foreground mb-4">
          You haven't booked any services yet
        </p>
        <Link to="/services">
          <Button className="bg-pickle hover:bg-pickle-dark">
            Explore Services
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserServices;
