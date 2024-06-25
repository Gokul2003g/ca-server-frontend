import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { Separator } from "./components/ui/separator"
import { Textarea } from "./components/ui/textarea"

function App() {

  const generateCertificate = () => {

  }

  return (
    <div className="flex flex-col items-center py-32 bg-gray-300 min-h-screen w-full">
      <div className="w-3/4">
        <Label className="text-3xl">Upload Public Key Here</Label>
        <Textarea className="my-8 text-xl" placeholder="Upload your public key to be signed" />
        <Button >Generate certificate</Button>
      </div>
      <Separator className="my-16 w-4/5" />
      <div className="w-3/4">
        <Label className="text-3xl">Get Certificate Here</Label>
        <Textarea className="my-8 text-xl" placeholder="Upload your public key to be signed" />
        <Button>Download Certificate</Button>
      </div>
      <Separator className="my-16 w-4/5" />
      <div className="w-3/4 flex justify-around">
        <Button>Download User Signing Key</Button>
        <Button>Download Host Signing Key</Button>
      </div>
    </div >
  )
}

export default App
