"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyJob } from "@/services/JobService";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function DialogDemo({
  open,
  setOpen,
  jobSlug,
  ownerId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobSlug: string;
  ownerId: string;
}) {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    resume: null,
    acceptTerms: false,
    declareApplication: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const formDataObject = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      contact_number: formValues.phone?.trim(),
    };
    formData.append("candidate_data", JSON.stringify(formDataObject));
    if (formValues.resume) {
      formData.append("candidate_resume", formValues.resume as File);
    }
    setLoading(true);
    try {
      const data = await applyJob({
        data: formData,
        jobSlug,
        updatedBy: ownerId,
      });
      console.log(data);
      setOpen(false);
      setLoading(false);
      toast({
        description: data?.data.detail,
        duration: 2000,
      });
    } catch (error) {
      console.error("Error submitting the form", error);
      toast({
        description: "Error whilte submitting the form",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[455px]">
        <DialogHeader>
          <DialogTitle>Application Form</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col py-4 gap-2">
          <div className="flex gap-3">
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
                className="focus:outline-none"
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
                className="focus:outline-none"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="focus:outline-none"
              required
              placeholder="email@gmail.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone No</Label>
            <Input
              id="phone"
              name="phone"
              type="number"
              value={formValues.phone}
              onChange={handleInputChange}
              className="focus:outline-none"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <Label htmlFor="resume">Resume</Label>
            <Input
              type="file"
              id="resume"
              name="resume"
              onChange={handleInputChange}
              className="focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <Input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formValues.acceptTerms}
                onChange={handleInputChange}
                className="w-3 focus:outline-none"
                required
              />
              <Label htmlFor="acceptTerms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="checkbox"
                id="declareApplication"
                name="declareApplication"
                checked={formValues.declareApplication}
                onChange={handleInputChange}
                className="w-3 focus:outline-none"
                required
              />
              <Label htmlFor="declareApplication">
                I declare my application for this job.
              </Label>
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <>
                <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
              </>
            ) : (
              <Button type="submit" className="bg-red-500 hover:bg-red-700">
                Apply Now
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
