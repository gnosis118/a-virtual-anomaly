
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface DonorInfoFormProps {
  form: UseFormReturn<any>;
}

const DonorInfoForm: React.FC<DonorInfoFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Your Information</h3>
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="agreeToUpdates"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <div className="flex items-center h-5 mt-px">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    id="agreeToUpdates"
                  />
                </div>
              </FormControl>
              <div className="leading-none">
                <FormLabel 
                  htmlFor="agreeToUpdates"
                  className="text-sm font-medium cursor-pointer"
                >
                  Keep me updated about A Virtual Anomaly's work
                </FormLabel>
                <FormDescription className="text-xs">
                  We'll send occasional updates about our initiatives and impact (max once per month).
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DonorInfoForm;
