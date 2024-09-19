'use client'
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { SignOut } from "@/components/SignOutButton"
import { UserAvatar } from "@/components/UserAvatar"
import { useSession } from "next-auth/react"
import { ModeToggle } from "@/components/ModeToggle"
import Loading from "../loading"

export default function MainContent() {

  // TODO: Remove console logs

  const session = useSession()
  const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;
  const [certificate, setCertificate] = useState<string>("");



  const formSchema = z.object({
    public_key: z.string(),
    is_host: z.boolean().default(false),
    identity: z.string(),
    provider: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      public_key: "",
      is_host: false,
      identity: "",
      provider: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session || !session.data.idToken) {
      console.error("User is not authenticated");
      return;
    }

    values.identity = userEmail || "not_set";
    values.provider = session.data.provider;

    try {
      const response = await axios.post(SERVER_URI + "handle-post/", values, {
        headers: {
          'Authorization': `Bearer ${session.data.idToken}`,
          'Content-Type': 'application/json'
        }
      });

      const cert = response.data;
      setCertificate(cert)
      console.log(cert)
      console.log(values);
    } catch (e) {
      console.log("Error sending form data", e);
    }
  }

  const downloadHostSignKey = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/public/host-sign-key.pub`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'host-sign-key.pub');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };


  const downloadUserSignKey = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/public/user-sign-key.pub`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'user-sign-key.pub'); // Set the desired file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  }

  const downloadCertificate = () => {
    if (!certificate || certificate == "Invalid Public Key") {
      console.error("No certificate available to download");
      return;
    }

    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ssh-cert.pub'); // Set the desired file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  if (session.status == "loading") {
    return <Loading />
  }

  const userEmail = session.data?.user?.email;

  return (
    <div className="min-h-screen">
      <nav className="px-8 py-6 flex justify-between items-center">
        <Image src="/sshgo_logo.jpg" alt="sshgo_logo" width={50} height={50} className="rounded-full" />
        <div className="flex gap-4 justify-center items-center">
          <ModeToggle />
          <UserAvatar session={session} />
          <SignOut />
        </div>
      </nav>
      <Separator />
      <div className="flex flex-col items-center py-12 ">
        <div className="w-3/4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="public_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-3xl">Upload Public Key Here</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Upload your public key to generate certificate"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_host"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Are you Host?
                      </FormLabel>
                      <FormDescription>
                        Toggle on to issue host certificate and off to issue user certificate
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Generate Certificate</Button>
            </form>
          </Form>

        </div>
        <Separator className="my-16 w-4/5 bg-black" />
        <div className="w-3/4">
          <Label className="text-3xl">Get Certificate Here</Label>
          <Textarea className="my-8 text-sm h-36" readOnly value={certificate} placeholder="Upload your public key to be signed" />
          <Button onClick={downloadCertificate}>Download Certificate</Button>
        </div>
        <Separator className="my-16 w-4/5 bg-black" />
        <div className="w-3/4 flex justify-around">
          <Button onClick={downloadUserSignKey}>Download User Signing Public Key (Hosts Download this)</Button>
          <Button onClick={downloadHostSignKey}>Download Host Signing Public Key (Users Download this)</Button>
        </div>
      </div >
    </div>
  )
}

