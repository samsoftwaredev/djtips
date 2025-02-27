import { FourCircleLoader } from "@/components";

const PageLoading = () => {
  return (
    <div className="w-screen dark:bg-darkgray min-h-screen flex justify-center align-middle items-center">
      <FourCircleLoader />
    </div>
  );
};

export default PageLoading;
