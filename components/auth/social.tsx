"use-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button className="w-full" variant="outline" size="lg">
        <FaGithub />
      </Button>
      <Button className="w-full" variant="outline" size="lg">
        <FcGoogle />
      </Button>
    </div>
  );
};
export default Social;
