import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      visibleToasts={90}
      duration={5000}
      position="top-right"
      className="select-none top-14! right-[calc((100vw-clamp(20rem,95%,90rem))/2+1rem)]! left-auto!  "
      {...props}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "w-80! ms-auto px-4 py-2 rounded-xl flex items-center gap-3 min-h-14",
          title: "text-sm/snug font-mono tracking-tight font-medium",
          description: "mt-2 text-sm/tight font-sans",
          default: "bg-accent border border-border",
          error:
            "bg-destructive/80 backdrop-blur border-destructive text-white",
          success: "bg-success/80 backdrop-blur border-success text-secondary ",
          warning: "bg-warning/80 backdrop-blur border-warning text-black  ",
        },
      }}
    />
  );
};

export default Toaster;
