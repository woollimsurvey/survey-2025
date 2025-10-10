import { FormProvider } from "@/contexts/FormContext";

export default function FormLayout({ children }) {
  return (
    <div className="m-auto max-w-7xl">
      <FormProvider>{children}</FormProvider>
    </div>
  );
}
