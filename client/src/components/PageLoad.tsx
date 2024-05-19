const PageLoad = () => {
  return (
    <div className="min-h-screen bg-white/95 dark:bg-[#0e0e0e] px-6 flex flex-col items-center justify-center">
      <span className="relative flex h-5 w-5 sm:h-6 sm:w-6">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 bg-primary"></span>
      </span>
      <span className="mt-4 text-black dark:text-white font-medium">
        Loading
      </span>
    </div>
  );
};

export default PageLoad;
