import { Plus } from "lucide-react";

import { Button } from "@dq/ui/button";

export function AddCommentTrigger() {
  return (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add comment
    </Button>
  );
}
