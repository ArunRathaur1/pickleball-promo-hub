import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AnalyticsPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Analytics</CardTitle>
        <CardDescription>
          Overview of website traffic and user engagement
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Analytics dashboard coming soon</p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPage;
