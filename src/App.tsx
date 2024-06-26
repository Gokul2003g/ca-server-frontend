import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form"
import { useState, ChangeEvent } from "react"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { Separator } from "./components/ui/separator"
import { Textarea } from "./components/ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Switch } from "./components/ui/switch"


function App() {

  const SERVER_URI = import.meta.env.VITE_SERVER_URI;

  const formSchema = z.object({
    public_key: z.string(),
    is_host: z.boolean().default(false),
    identity: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      public_key: "",
      is_host: false,
      identity: "Take from auth"
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values);
  }

  const generateCertificate = (publicKey: string) => {

  }

  const downloadHostSignKey = () => {

  }

  const downloadUserSignKey = () => {

  }


  return (
    <div className="flex flex-col items-center py-32 bg-gray-300 min-h-screen w-full">
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-black p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Are you getting Host Certificate?
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
        <Textarea className="my-8 text-xl" placeholder="Upload your public key to be signed" />
        <Button>Download Certificate</Button>
      </div>
      <Separator className="my-16 w-4/5 bg-black" />
      <div className="w-3/4 flex justify-around">
        <Button onClick={downloadUserSignKey}>Download User Signing Key</Button>
        <Button onClick={downloadHostSignKey}>Download Host Signing Key</Button>
      </div>
    </div >
  )
}

export default App
