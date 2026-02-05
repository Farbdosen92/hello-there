"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-zinc-500">Manage your company profile and integrations.</p>
            </div>

            <Card className="bg-zinc-900/50 border-white/5">
                <CardHeader>
                    <CardTitle>Global Integrations</CardTitle>
                    <CardDescription>Connect your external tools.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* Salesforce */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Salesforce CRM</Label>
                            <p className="text-sm text-zinc-500">Sync leads automatically to Salesforce.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-yellow-500" />
                            <span className="text-xs text-zinc-500 uppercase">Pending</span>
                            <Button variant="outline" size="sm" className="ml-2 border-white/10">Connect</Button>
                        </div>
                    </div>
                    <Separator className="bg-white/5" />

                    {/* HubSpot */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">HubSpot</Label>
                            <p className="text-sm text-zinc-500">Sync leads automatically to HubSpot.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-xs text-zinc-500 uppercase">Connected</span>
                            <Button variant="outline" size="sm" className="ml-2 border-white/10">Configure</Button>
                        </div>
                    </div>
                    <Separator className="bg-white/5" />

                    {/* Stripe */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Stripe Payments</Label>
                            <p className="text-sm text-zinc-500">Receive tips in Hospitality Mode.</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-white/5">
                <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Update your brand details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="cname">Company Name</Label>
                        <Input id="cname" defaultValue="Severmore GmbH" className="bg-black/50 border-white/10" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="web">Website</Label>
                        <Input id="web" defaultValue="https://severmore.de" className="bg-black/50 border-white/10" />
                    </div>
                    <Button className="w-fit bg-white text-black hover:bg-zinc-200">Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
