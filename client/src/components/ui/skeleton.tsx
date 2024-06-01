import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#c7c7c7] dark:bg-gray-700",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
