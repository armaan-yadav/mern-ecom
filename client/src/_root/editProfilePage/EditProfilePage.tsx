import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Pencil } from "lucide-react";
import { FormEvent, useEffect, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import authServices from "@/services/userAuthServices";
import { useUpdateUserMutation } from "@/redux/user/userApi";
import { updateUser as reduxUpdateUser } from "../../redux/user/userSlice";
import { customToast } from "@/lib/utils";

const EditProfilePage = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();

  const [gender, setGender] = useState<string | undefined>(user?.gender);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user?.gender) {
      setGender(user.gender);
    }
  }, [user?.gender]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const updatedFields = { ...data };

      if (gender) {
        updatedFields["gender"] = gender;
      }

      if (image) {
        const url = await authServices.uploadImage(image);
        url && (updatedFields["photo"] = url);
        console.log(url);
        console.log(updatedFields);
        setImage(null);
      }

      const { data: resData } = await updateUser({
        id: user?._id!,
        updatedFields,
      });
      if (resData) {
        customToast(resData.message);
      }
      dispatch(reduxUpdateUser(updatedFields));
    } catch (error) {
      customToast("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePencilClick = () => {
    fileInputRef.current?.click();
  };

  if (loading && !user) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative w-fit">
          <Avatar className="size-[80px] border-[1px]">
            <AvatarImage src={previewUrl ? previewUrl : user?.photo} />
            <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>

          <Input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
          />
          <Pencil
            className="absolute right-0 bottom-0.5 bg-black text-white rounded-full p-1 cursor-pointer hover:bg-gray-700"
            onClick={handlePencilClick}
          />
        </div>

        <div>
          <Label>Name</Label>
          <Input defaultValue={user?.name} name="name" />
        </div>
        <div>
          <Label>Email</Label>
          <Input defaultValue={user?.email} readOnly />
        </div>
        <div>
          <Label>Phone</Label>
          <Input defaultValue={user?.phone} type="tel" name="phone" />
        </div>
        <div>
          <Label>DOB</Label>
          <Input defaultValue={user?.dob} name="dob" />
        </div>
        <div>
          <Label>Gender</Label>
          <Select
            value={gender}
            onValueChange={(e: "male" | "female") => setGender(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "loaddinggg...." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
};

export default EditProfilePage;
