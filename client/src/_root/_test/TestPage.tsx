import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImageToCloudinary } from "@/lib/utils";
import { useEffect, useState } from "react";

const TestPage = () => {
  const [image, setImage] = useState<File | null>();
  const [localUrl, setLocalUrl] = useState<string>();

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setLocalUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  return (
    <div>
      <Input type="file" onChange={(e) => setImage(e.target.files?.[0])} />

      {localUrl && <img src={localUrl} className="h-[300px]" />}

      <Button
        onClick={async () => {
          if (image) {
            await uploadImageToCloudinary(image);
          }
        }}
      >
        Upload
      </Button>
    </div>
  );
};

export default TestPage;
