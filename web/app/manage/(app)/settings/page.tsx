import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Settings — SnookX Management" };

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">

      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your venue and account preferences.</p>
      </div>

      {/* Venue info */}
      <Card>
        <CardHeader>
          <CardTitle>Venue Info</CardTitle>
          <CardDescription>Basic details about your snooker club.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="vname">Venue Name</Label>
            <Input id="vname" defaultValue="SnookX Nagpur" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address">Address</Label>
            <textarea
              id="address"
              rows={2}
              defaultValue="Civil Lines, Nagpur, Maharashtra 440001"
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+91 71234 56789" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hours">Opening Hours</Label>
              <Input id="hours" defaultValue="10:00 AM – 11:00 PM" />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5 space-y-4">
          {[
            { id: "cur", label: "Current Password" },
            { id: "new", label: "New Password" },
            { id: "cnf", label: "Confirm New Password" },
          ].map(({ id, label }) => (
            <div key={id} className="space-y-1.5">
              <Label htmlFor={id}>{label}</Label>
              <Input id={id} type="password" placeholder="••••••••" />
            </div>
          ))}
          <div className="flex justify-end pt-1">
            <Button>Change Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>These actions are irreversible. Proceed with caution.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" disabled>
            Delete Venue Data
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
